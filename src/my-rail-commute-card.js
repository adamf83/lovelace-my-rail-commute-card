import { LitElement, html } from 'lit';
import { styles } from './styles.js';
import {
  formatTime,
  getRelativeTime,
  getStatusClass,
  getStatusIcon,
  getStatusText,
  getBoardStatus,
  formatCallingPoints,
  abbreviateStation,
  filterTrains,
  sortTrains,
  getTrainIcon,
  shouldShowTrains,
  calculateJourneyDuration
} from './utils.js';
import './editor.js'; // Import editor to bundle it

console.info(
  '%c MY-RAIL-COMMUTE-CARD \n%c Version 1.0.0 ',
  'color: cyan; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

class MyRailCommuteCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _trains: { type: Array },
      _origin: { type: String },
      _destination: { type: String },
      _lastUpdated: { type: String },
      _hasDisruption: { type: Boolean },
      _disruptionSeverity: { type: String },
      _disruptionMessage: { type: String },
      _resolvedStatusEntityId: { type: String },
      _loading: { type: Boolean },
      _returnEntityId: { type: String },
      _showReturn: { type: Boolean },
      _favorites: { type: Object },
      _flagged: { type: Object },
      _showSaved: { type: Boolean }
    };
  }

  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this._trains = [];
    this._origin = '';
    this._destination = '';
    this._lastUpdated = '';
    this._hasDisruption = false;
    this._disruptionSeverity = '';
    this._disruptionMessage = '';
    this._resolvedStatusEntityId = '';
    this._loading = true;
    this._toastTimer = null;
    this._returnEntityId = null;
    this._showReturn = false;
    this._returnEntityCacheKey = null;
    this._favorites = new Map();
    this._flagged = new Map();
    this._showSaved = false;
    // Storage internals (non-reactive)
    this._favEntityId = null;
    this._flagEntityId = null;
    this._storageReady = false;
    this._initStoragePending = false;
    this._lastSavedFavState = undefined;
    this._lastSavedFlagState = undefined;
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    // Allow empty entity during initial setup, but store config anyway
    if (!config.entity && config.entity !== '') {
      throw new Error('Please select a rail commute summary sensor');
    }
    this.config = {
      view: 'full',
      theme: 'auto',
      show_header: true,
      show_route: true,
      show_last_updated: false,
      show_platform: true,
      show_operator: true,
      show_calling_points: false,
      show_delay_reason: true,
      show_journey_time: false,
      show_service_type: false,
      max_calling_points: 3,
      hide_on_time_trains: false,
      only_show_disrupted: false,
      min_delay_to_show: 0,
      auto_refresh: true,
      refresh_interval: 60,
      card_style: 'departure-board',
      font_size: 'medium',
      compact_height: false,
      show_animations: true,
      status_icons: true,
      show_action_buttons: true,
      ...config
    };

    // Set custom color CSS variables if provided
    if (config.colors) {
      if (config.colors.on_time) {
        this.style.setProperty('--custom-on-time-color', config.colors.on_time);
      }
      if (config.colors.minor_delay) {
        this.style.setProperty('--custom-minor-delay-color', config.colors.minor_delay);
      }
      if (config.colors.major_delay) {
        this.style.setProperty('--custom-major-delay-color', config.colors.major_delay);
      }
      if (config.colors.cancelled) {
        this.style.setProperty('--custom-cancelled-color', config.colors.cancelled);
      }
    }

    // Set theme attribute
    if (config.theme && config.theme !== 'auto') {
      this.setAttribute('theme', config.theme);
    }

    // Set font size attribute
    if (config.font_size) {
      this.setAttribute('font-size', config.font_size);
    }

    // Set no animations attribute
    if (config.show_animations === false) {
      this.setAttribute('no-animations', '');
    }
  }

  set hass(hass) {
    this._hass = hass;

    // If no entity configured yet (during initial setup), show loading
    if (!this.config.entity) {
      this._loading = false;
      this._trains = [];
      return;
    }

    // Get the summary sensor
    const summaryEntity = hass.states[this.config.entity];

    if (!summaryEntity) {
      console.error('Entity not found:', this.config.entity);
      this._loading = false;
      this._trains = [];
      return;
    }

    // Extract outbound origin/destination for return entity detection
    const outboundOrigin = summaryEntity.attributes.origin_name ||
                           summaryEntity.attributes.origin ||
                           summaryEntity.attributes.from_station || '';
    const outboundDest = summaryEntity.attributes.destination_name ||
                         summaryEntity.attributes.destination ||
                         summaryEntity.attributes.to_station || '';

    // Detect return entity — cache result so we don't scan all states on every update
    const cacheKey = `${outboundOrigin}|${outboundDest}`;
    if (cacheKey !== this._returnEntityCacheKey) {
      this._returnEntityCacheKey = cacheKey;
      this._returnEntityId = this._findReturnEntity(hass, outboundOrigin, outboundDest);
    } else if (this._returnEntityId && !hass.states[this._returnEntityId]) {
      // Cached entity no longer exists — clear cache and re-scan
      this._returnEntityCacheKey = null;
      this._returnEntityId = this._findReturnEntity(hass, outboundOrigin, outboundDest);
    }

    // If _showReturn is toggled but the return entity no longer exists, reset
    if (this._showReturn && !this._returnEntityId) {
      this._showReturn = false;
    }

    // Determine which entity to load train data from
    const activeEntityId = this._showReturn && this._returnEntityId
      ? this._returnEntityId
      : this.config.entity;
    const activeEntity = hass.states[activeEntityId];

    if (!activeEntity) {
      this._loading = false;
      this._trains = [];
      return;
    }

    // Extract train data - try multiple sources
    if (activeEntity.attributes.all_trains && activeEntity.attributes.all_trains.length > 0) {
      // Method 1: Direct all_trains attribute from integration
      // Add train_id based on entity naming pattern
      const baseName = activeEntityId.replace('sensor.', '').replace('_summary', '').replace('_commute_summary', '');
      this._trains = activeEntity.attributes.all_trains.map((train, index) => {
        const rawNum = train.train_number != null && train.train_number !== ''
          ? String(train.train_number).toLowerCase().replace(/[^a-z0-9]/g, '_')
          : String(index + 1);
        return {
          ...train,
          train_id: `sensor.${baseName}_train_${rawNum}`
        };
      });
    } else {
      // Method 2: Auto-discover individual train sensors
      this._trains = this._getTrainsFromIndividualSensors(hass, activeEntityId);
    }

    // Set route display — swap origin/destination when showing return journey
    this._origin = this._showReturn ? outboundDest : outboundOrigin;
    this._destination = this._showReturn ? outboundOrigin : outboundDest;
    this._lastUpdated = activeEntity.attributes.last_updated ||
                        activeEntity.last_updated ||
                        activeEntity.last_changed || '';

    // Sort trains
    if (this._trains && this._trains.length > 0) {
      this._trains = sortTrains(this._trains);
    }

    // Detect disruption from the status sensor (single source of truth).
    // The sensor state is one of: Normal, Minor Delays, Major Delays, Severe Disruption, Critical
    this._hasDisruption = false;
    this._disruptionSeverity = '';
    this._disruptionMessage = '';
    this._resolvedStatusEntityId = '';

    // Use explicitly configured status_entity, or auto-discover by naming convention.
    // When showing the return journey, resolve the status entity from the return route's
    // entity so that the outbound disruption banner doesn't bleed through.
    let statusEntityId;
    if (this._showReturn && this._returnEntityId) {
      // Return journey: auto-discover return route's status entity
      const baseName = this._returnEntityId
        .replace('sensor.', '')
        .replace('_summary', '')
        .replace('_commute_summary', '');
      const autoId = `sensor.${baseName}_status`;
      if (hass.states[autoId]) {
        statusEntityId = autoId;
      }
      // If no return status entity found, statusEntityId remains undefined → no banner
    } else {
      // Outbound journey: use explicit config or auto-discover.
      // Strip suffixes in the same order as train discovery: remove _summary first
      // (only the suffix), then _commute_summary won't match. This preserves the
      // _commute_ prefix so sensor.morning_commute_summary → sensor.morning_commute_status.
      statusEntityId = this.config.status_entity;
      if (!statusEntityId) {
        const baseName = this.config.entity
          .replace('sensor.', '')
          .replace('_summary', '')
          .replace('_commute_summary', '');
        const autoId = `sensor.${baseName}_status`;
        if (hass.states[autoId]) {
          statusEntityId = autoId;
        }
      }
    }

    if (statusEntityId) {
      this._resolvedStatusEntityId = statusEntityId;
      const statusEntity = hass.states[statusEntityId];
      if (statusEntity) {
        const state = (statusEntity.state || '').toLowerCase().trim();
        if (state !== 'normal' && state !== 'unknown' && state !== 'unavailable' && state !== '') {
          this._hasDisruption = true;
          if (state.includes('critical')) {
            this._disruptionSeverity = 'critical';
          } else if (state.includes('severe')) {
            this._disruptionSeverity = 'severe';
          } else if (state.includes('major')) {
            this._disruptionSeverity = 'major';
          } else {
            this._disruptionSeverity = 'minor';
          }
          this._disruptionMessage = statusEntity.attributes.message ||
                                    statusEntity.attributes.reason ||
                                    statusEntity.attributes.disruption_message || '';
        }
      }
    }

    // Filter trains
    if (this._trains && this._trains.length > 0) {
      this._trains = filterTrains(this._trains, this.config);
    }

    // Initialise HA storage entities once origin/destination are known
    if (this._origin && this._destination && !this._storageReady && !this._initStoragePending) {
      this._initStoragePending = true;
      this._initStorage().finally(() => { this._initStoragePending = false; });
    }

    // Sync favourites/flags from HA entity state on each update
    if (this._storageReady) {
      this._syncFromHA();
    }

    this._loading = false;
    this.requestUpdate();
  }

  _findReturnEntity(hass, origin, destination) {
    if (!origin || !destination) return null;
    const originLower = origin.toLowerCase().trim();
    const destLower = destination.toLowerCase().trim();

    for (const [entityId, state] of Object.entries(hass.states)) {
      if (entityId === this.config.entity) continue;
      if (!state.attributes) continue;
      const attrs = state.attributes;
      // Only consider entities that look like rail summary sensors
      if (!attrs.all_trains && !attrs.origin_name && !attrs.origin && !attrs.from_station) continue;
      const eOrigin = (attrs.origin_name || attrs.origin || attrs.from_station || '').toLowerCase().trim();
      const eDest = (attrs.destination_name || attrs.destination || attrs.to_station || '').toLowerCase().trim();
      if (!eOrigin || !eDest) continue;
      if (eOrigin === destLower && eDest === originLower) return entityId;
    }
    return null;
  }

  _toggleReturn() {
    this._showReturn = !this._showReturn;
    if (this._hass) this.hass = this._hass;
  }

  // ==================== STORAGE (FAVOURITES & FLAGS) ====================

  _getEntityBase() {
    const entityId = this.config.entity || '';
    return entityId
      .replace(/^sensor\./, '')
      .replace(/_commute_summary$/, '')
      .replace(/_summary$/, '')
      .toLowerCase();
  }

  _getConfigEntryId() {
    const entityEntry = this._hass?.entities?.[this.config.entity];
    return entityEntry?.config_entry_id ?? null;
  }

  async _initStorage() {
    const base = this._getEntityBase();
    this._favEntityId = `sensor.${base}_favourites`;
    this._flagEntityId = `sensor.${base}_flagged`;

    this._storageReady = true;
    this._loadInitialData();
  }

  _loadInitialData() {
    const favEntity = this._hass?.states[this._favEntityId];
    if (favEntity?.attributes?.favourites) {
      this._favorites = new Map(favEntity.attributes.favourites.map(f => {
        const key = (f.scheduled_departure ?? '').slice(0, 5) || f.scheduled_departure;
        return [key, f];
      }));
      this._lastSavedFavState = JSON.stringify(favEntity.attributes.favourites);
    }

    const flagEntity = this._hass?.states[this._flagEntityId];
    if (flagEntity?.attributes?.flagged) {
      this._flagged = new Map(flagEntity.attributes.flagged.map(f => {
        const key = f.key ?? `${f.date ?? ''}|${(f.scheduled_departure ?? '').slice(0, 5)}`;
        return [key, f];
      }));
      this._lastSavedFlagState = JSON.stringify(flagEntity.attributes.flagged);
    }

    this.requestUpdate();
  }

  _syncFromHA() {
    if (!this._favEntityId) return;

    const favEntity = this._hass.states[this._favEntityId];
    if (favEntity?.attributes?.favourites) {
      const newState = JSON.stringify(favEntity.attributes.favourites);
      if (newState !== this._lastSavedFavState) {
        this._favorites = new Map(favEntity.attributes.favourites.map(f => {
          const key = (f.scheduled_departure ?? '').slice(0, 5) || f.scheduled_departure;
          return [key, f];
        }));
        this._lastSavedFavState = newState;
      }
    }

    const flagEntity = this._hass.states[this._flagEntityId];
    if (flagEntity?.attributes?.flagged) {
      const newState = JSON.stringify(flagEntity.attributes.flagged);
      if (newState !== this._lastSavedFlagState) {
        this._flagged = new Map(flagEntity.attributes.flagged.map(f => {
          const key = f.key ?? `${f.date ?? ''}|${(f.scheduled_departure ?? '').slice(0, 5)}`;
          return [key, f];
        }));
        this._lastSavedFlagState = newState;
      }
    }
  }

  _toggleFavorite(train, event) {
    event.stopPropagation();
    const favKey = formatTime(train.scheduled_departure);
    if (!favKey || favKey === '—') return;
    const entryId = this._getConfigEntryId();

    const newFavs = new Map(this._favorites);
    if (newFavs.has(favKey)) {
      newFavs.delete(favKey);
      if (entryId) this._hass.callService('my_rail_commute', 'remove_favourite', {
        entry_id: entryId,
        scheduled_departure: favKey,
        operator: train.operator || ''
      });
    } else {
      newFavs.set(favKey, { scheduled_departure: favKey, operator: train.operator || '' });
      if (entryId) this._hass.callService('my_rail_commute', 'add_favourite', {
        entry_id: entryId,
        scheduled_departure: favKey,
        operator: train.operator || ''
      });
    }
    this._favorites = newFavs;
  }

  _toggleFlag(train, event) {
    event.stopPropagation();
    const favKey = formatTime(train.scheduled_departure);
    if (!favKey || favKey === '—') return;
    const entryId = this._getConfigEntryId();

    const today = new Date().toISOString().split('T')[0];
    const flagKey = `${today}|${favKey}`;
    const newFlags = new Map(this._flagged);
    if (newFlags.has(flagKey)) {
      newFlags.delete(flagKey);
      if (entryId) this._hass.callService('my_rail_commute', 'unflag_train', {
        entry_id: entryId,
        scheduled_departure: favKey,
        service_id: train.service_id || train.train_number || ''
      });
    } else {
      newFlags.set(flagKey, { key: flagKey, scheduled_departure: favKey, operator: train.operator || '', reason: train.delay_reason || '', date: today });
      if (entryId) this._hass.callService('my_rail_commute', 'flag_train', {
        entry_id: entryId,
        service_id: train.service_id || train.train_number || '',
        scheduled_departure: favKey,
        reason: train.delay_reason || ''
      });
    }
    this._flagged = newFlags;
  }

  _clearFavourites() {
    const entryId = this._getConfigEntryId();
    if (!entryId) return;
    this._favorites = new Map();
    this._hass.callService('my_rail_commute', 'clear_favourites', { entry_id: entryId });
  }

  _clearFlagged() {
    const entryId = this._getConfigEntryId();
    if (!entryId) return;
    this._flagged = new Map();
    this._hass.callService('my_rail_commute', 'clear_flagged', { entry_id: entryId });
  }

  _renderTrainActions(train) {
    if (this.config.show_action_buttons === false) return '';
    const favKey = formatTime(train.scheduled_departure);
    const today = new Date().toISOString().split('T')[0];
    const flagKey = `${today}|${favKey}`;
    const isFav = this._favorites.has(favKey) || train.is_favourite === true;
    const isFlagged = this._flagged.has(flagKey) || train.is_flagged === true;
    return html`
      <div class="train-actions">
        <button
          class="action-btn fav-btn ${isFav ? 'active' : ''}"
          @click="${(e) => this._toggleFavorite(train, e)}"
          title="${isFav ? 'Remove favourite' : 'Mark as favourite'}"
        ><ha-icon icon="${isFav ? 'mdi:star' : 'mdi:star-outline'}"></ha-icon></button>
        <button
          class="action-btn flag-btn ${isFlagged ? 'active' : ''}"
          @click="${(e) => this._toggleFlag(train, e)}"
          title="${isFlagged ? 'Remove delay flag' : 'Flag for delay review'}"
        ><ha-icon icon="${isFlagged ? 'mdi:flag' : 'mdi:flag-outline'}"></ha-icon></button>
      </div>
    `;
  }

  _getTrainsFromIndividualSensors(hass, entityId) {
    // Auto-discover train sensors based on entity naming pattern
    const sourceEntityId = entityId || this.config.entity;
    const baseName = sourceEntityId
      .replace('sensor.', '')
      .replace('_summary', '')
      .replace('_commute_summary', ''); // Also handle _commute_summary

    // Try multiple naming patterns
    const patterns = [
      `sensor.${baseName}_train_`,
      `sensor.${baseName}_train`,  // without trailing underscore
      `sensor.${baseName.replace(/_/g, '-')}_train_`,  // with dashes
      `sensor.${baseName.replace(/_/g, '')}_train_`,   // no separators
    ];

    let trainSensors = [];
    for (const pattern of patterns) {
      const found = Object.keys(hass.states).filter(entityId =>
        entityId.startsWith(pattern)
      );
      if (found.length > 0) {
        trainSensors = found;
        break;
      }
    }

    // Sort by train number
    trainSensors.sort((a, b) => {
      const numA = parseInt(a.match(/train[_-]?(\d+)$/i)?.[1] || '0', 10);
      const numB = parseInt(b.match(/train[_-]?(\d+)$/i)?.[1] || '0', 10);
      return numA - numB;
    });

    const trains = trainSensors.map(entityId => {
      const entity = hass.states[entityId];
      if (!entity) {
        console.warn(`my-rail-commute-card: train sensor not found: ${entityId}`);
        return null;
      }

      // Handle calling_points - might be array or comma-separated string
      let callingPoints = entity.attributes.calling_points ||
                         entity.attributes.stops ||
                         entity.attributes.calling_at ||
                         entity.attributes['Calling at'] || // Handle "Calling at: X, Y, Z"
                         [];

      // If it's a string, split by comma
      if (typeof callingPoints === 'string') {
        callingPoints = callingPoints.split(',').map(s => s.trim()).filter(s => s);
      }

      // Parse train data - try all possible time attribute names
      const scheduledDep = entity.attributes.scheduled_departure ||
                          entity.attributes.scheduled ||
                          entity.attributes.departure ||
                          entity.attributes.departure_time ||
                          entity.attributes.std || // Standard UK rail API
                          entity.attributes.aimed_departure_time ||
                          entity.attributes['Scheduled Departure'] ||
                          entity.state;

      const expectedDep = entity.attributes.expected_departure ||
                         entity.attributes.expected ||
                         entity.attributes.estimated ||
                         entity.attributes.estimated_departure ||
                         entity.attributes.etd || // Standard UK rail API
                         entity.attributes.expected_arrival ||
                         entity.attributes['Expected Departure'] ||
                         scheduledDep; // Fall back to scheduled if no expected

      const scheduledArr = entity.attributes.scheduled_arrival ||
                          entity.attributes.sta ||
                          entity.attributes['Scheduled Arrival'] || null;

      const estimatedArr = entity.attributes.estimated_arrival ||
                          entity.attributes.eta ||
                          entity.attributes['Estimated Arrival'] ||
                          scheduledArr;

      // Determine which departure time to use for journey duration calculation.
      // Use expected_departure only if it contains a real time (HH:MM), not a status
      // word like "Delayed" or "On Time".
      const depIsValidTime = /\d{1,2}:\d{2}/.test(String(expectedDep));
      const depForDuration = depIsValidTime ? expectedDep : scheduledDep;

      // Flag as approximate when expected_departure was a non-time delay status word
      // (e.g. "Delayed"). "On Time" and identical-to-scheduled values are not approximate.
      const ON_TIME_RE = /^(on[\s-]?time|right\s*time)$/i;
      const journeyTimeApprox = !depIsValidTime &&
        !!expectedDep &&
        expectedDep !== scheduledDep &&
        !ON_TIME_RE.test(String(expectedDep).trim());

      const train = {
        train_id: entityId,
        scheduled_departure: scheduledDep,
        expected_departure: expectedDep,
        platform: entity.attributes.platform || entity.attributes.Platform || '',
        operator: entity.attributes.operator ||
                 entity.attributes.service_operator ||
                 entity.attributes.Operator || '',
        is_cancelled: entity.attributes.is_cancelled ||
                     entity.attributes.cancelled ||
                     entity.state === 'Cancelled' ||
                     entity.state === 'Canceled' ||
                     false,
        is_no_service: entity.attributes.is_no_service ||
                      entity.attributes.no_service ||
                      entity.state === 'No service' ||
                      entity.state === 'No Service' ||
                      false,
        delay_minutes: parseInt(entity.attributes.delay_minutes ||
                               entity.attributes.delay ||
                               entity.attributes.minutes_late ||
                               entity.attributes['Delay minutes'] ||
                               '0', 10),
        delay_reason: entity.attributes.delay_reason ||
                     entity.attributes.reason ||
                     entity.attributes['Delay reason'] || '',
        calling_points: callingPoints,
        journey_duration: entity.attributes.journey_duration ||
                         entity.attributes.duration ||
                         calculateJourneyDuration(depForDuration, estimatedArr || scheduledArr),
        journey_time_approx: journeyTimeApprox,
        service_type: entity.attributes.service_type ||
                     entity.attributes.type || ''
      };

      return train;
    }).filter(train => train !== null);

    return trains;
  }

  getCardSize() {
    const view = this.config.view || 'full';
    const trainCount = this._trains?.length || 0;

    switch (view) {
      case 'compact':
        return 1 + Math.ceil(trainCount * 0.5);
      case 'next-only':
        return 3;
      case 'board':
        return 2 + trainCount;
      default:
        return 2 + trainCount;
    }
  }

  render() {
    // Check if entity is configured
    if (!this.config.entity) {
      return this._renderEmpty('No entity selected', 'Please select a rail commute summary sensor in the card configuration');
    }

    if (this._loading) {
      return this._renderLoading();
    }

    // Check if we should show trains based on disruption setting
    if (!shouldShowTrains(this._hasDisruption, this.config.only_show_disrupted)) {
      return this._renderEmpty('No disruption detected', 'Trains will appear when there is disruption');
    }

    if (!this._trains || this._trains.length === 0) {
      return this._renderEmpty();
    }

    const view = this.config.view || 'full';

    switch (view) {
      case 'compact':
        return this._renderCompact();
      case 'next-only':
        return this._renderNextOnly();
      case 'board':
        return this._renderBoard();
      default:
        return this._renderFull();
    }
  }

  _renderHeader() {
    const showHeader = this.config.show_header !== false;
    const showRoute = this.config.show_route !== false;

    if (!showHeader) return '';

    const title = this.config.title || 'Rail Commute';

    return html`
      <div class="card-header">
        <div class="header-content">
          <ha-icon icon="mdi:train"></ha-icon>
          <span class="header-title">${title}</span>
          ${this._returnEntityId ? html`
            <button
              class="return-toggle ${this._showReturn ? 'active' : ''}"
              @click="${this._toggleReturn}"
              title="${this._showReturn ? 'Show outbound journey' : 'Show return journey'}"
            >
              <ha-icon icon="mdi:swap-horizontal"></ha-icon>
            </button>
          ` : ''}
          ${this.config.view !== 'next-only' ? html`
            <button
              class="saved-tab-btn ${this._showSaved ? 'active' : ''}"
              @click="${() => { this._showSaved = !this._showSaved; }}"
              title="${this._showSaved ? 'Show live trains' : 'Show saved trains'}"
            >
              <ha-icon icon="mdi:bookmark"></ha-icon>
            </button>
          ` : ''}
        </div>
        ${showRoute && this._origin && this._destination ? html`
          <div class="route">
            ${this._origin} → ${this._destination}
          </div>
        ` : ''}
      </div>
    `;
  }

  _renderDisruptionBanner() {
    if (!this._hasDisruption) return '';

    const severityMap = {
      minor:    { cls: 'disruption-minor',    label: 'Minor Delays',        icon: 'mdi:alert' },
      major:    { cls: 'disruption-major',    label: 'Major Delays',        icon: 'mdi:alert' },
      severe:   { cls: 'disruption-severe',   label: 'Severe Disruption',   icon: 'mdi:alert-circle' },
      critical: { cls: 'disruption-critical', label: 'Critical Disruption', icon: 'mdi:alert-octagon' },
    };
    const { cls, label, icon } = severityMap[this._disruptionSeverity] || severityMap.minor;
    const hasClickTarget = !!this._resolvedStatusEntityId;

    return html`
      <div
        class="disruption-banner ${cls} ${hasClickTarget ? 'disruption-clickable' : ''}"
        @click="${hasClickTarget ? () => this._showDisruptionMoreInfo() : null}"
        role="${hasClickTarget ? 'button' : 'alert'}"
      >
        <ha-icon icon="${icon}" class="disruption-icon"></ha-icon>
        <div class="disruption-content">
          <span class="disruption-label">${label} on this route</span>
          ${this._disruptionMessage ? html`
            <span class="disruption-message">${this._disruptionMessage}</span>
          ` : ''}
        </div>
        ${hasClickTarget ? html`
          <ha-icon icon="mdi:chevron-right" class="disruption-chevron"></ha-icon>
        ` : ''}
      </div>
    `;
  }

  _showDisruptionMoreInfo() {
    if (!this._resolvedStatusEntityId) return;
    const event = new Event('hass-more-info', {
      bubbles: true,
      composed: true,
    });
    event.detail = { entityId: this._resolvedStatusEntityId };
    this.dispatchEvent(event);
  }

  _renderFooter() {
    if (this.config.show_last_updated === false) return '';

    return html`
      <div class="card-footer">
        <span class="last-updated">
          Last updated: ${getRelativeTime(this._lastUpdated)}
        </span>
      </div>
    `;
  }

  _renderFull() {
    if (this._showSaved) {
      return this._renderSaved();
    }

    const compactClass = this.config.compact_height ? 'compact-height' : '';

    return html`
      <ha-card class="${compactClass}">
        ${this._renderHeader()}
        ${this._renderDisruptionBanner()}

        <div class="card-content">
          ${this._trains.map(train => this._renderTrainRow(train))}
        </div>

        ${this._renderFooter()}
      </ha-card>
    `;
  }

  _renderSaved() {
    const favs = [...this._favorites.values()];
    const flags = [...this._flagged.values()];

    return html`
      <ha-card>
        ${this._renderHeader()}
        <div class="card-content saved-panel">
          <div class="saved-section">
            <div class="saved-section-header">
              <ha-icon icon="mdi:star"></ha-icon>
              <span>Favourites</span>
              ${favs.length > 0 ? html`
                <button class="clear-btn" @click="${() => this._clearFavourites()}"
                  title="Clear all favourites">Clear all</button>
              ` : ''}
            </div>
            ${favs.length === 0
              ? html`<div class="saved-empty">No favourites saved</div>`
              : favs.map(f => html`
                  <div class="saved-row">
                    <ha-icon icon="mdi:star" class="saved-icon fav-icon"></ha-icon>
                    <span class="saved-time">${(f.scheduled_departure ?? '').slice(0, 5)}</span>
                    <span class="saved-operator">${f.operator ?? ''}</span>
                  </div>
                `)
            }
          </div>

          <div class="saved-section">
            <div class="saved-section-header">
              <ha-icon icon="mdi:flag"></ha-icon>
              <span>Flagged Trains</span>
              ${flags.length > 0 ? html`
                <button class="clear-btn" @click="${() => this._clearFlagged()}"
                  title="Clear all flagged trains">Clear all</button>
              ` : ''}
            </div>
            ${flags.length === 0
              ? html`<div class="saved-empty">No flagged trains</div>`
              : flags.map(f => html`
                  <div class="saved-row">
                    <ha-icon icon="mdi:flag" class="saved-icon flag-icon"></ha-icon>
                    <span class="saved-time">${(f.scheduled_departure ?? '').slice(0, 5)}</span>
                    <span class="saved-operator">${f.operator ?? ''}</span>
                    ${f.reason ? html`<span class="saved-reason">${f.reason}</span>` : ''}
                  </div>
                `)
            }
          </div>
        </div>
      </ha-card>
    `;
  }

  _renderTrainRow(train) {
    const statusClass = getStatusClass(train);
    const statusIcon = this.config.status_icons !== false ? getStatusIcon(train) : '';
    const showPlatform = this.config.show_platform !== false;
    const showOperator = this.config.show_operator !== false;
    const showDelayReason = this.config.show_delay_reason !== false;
    const showCallingPoints = this.config.show_calling_points === true;
    const showJourneyTime = this.config.show_journey_time === true;
    const favKey = formatTime(train.scheduled_departure);
    const today = new Date().toISOString().split('T')[0];
    const isFav = this._favorites.has(favKey) || train.is_favourite === true;
    const isFlagged = this._flagged.has(`${today}|${favKey}`) || train.is_flagged === true;

    return html`
      <div
        class="train-row ${statusClass} ${isFav ? 'favourite' : ''} ${isFlagged ? 'flagged' : ''}"
        @click="${() => this._handleTap(train)}"
        @touchstart="${this._handleTouchStart}"
        @touchend="${this._handleTouchEnd}"
        @touchmove="${this._handleTouchMove}"
      >
        <div class="train-main">
          ${this._renderTrainActions(train)}
          <div class="train-time">
            <ha-icon icon="${getTrainIcon(train)}"></ha-icon>
            <span class="time">${formatTime(train.scheduled_departure)}</span>
            <span class="expected-time">${train.expected_departure && train.expected_departure !== train.scheduled_departure ? formatTime(train.expected_departure) : ''}</span>
          </div>

          ${showPlatform ? html`
            <div class="train-platform">
              Platform ${train.platform || '—'}
            </div>
          ` : ''}

          <div class="train-status">
            ${statusIcon}
            ${getStatusText(train)}
          </div>
        </div>

        <div class="train-details">
          ${showOperator && train.operator ? html`
            <span class="operator">${train.operator}</span>
          ` : ''}

          ${showDelayReason && train.delay_reason ? html`
            <div class="delay-reason">
              → ${train.delay_reason}
            </div>
          ` : ''}

          ${showCallingPoints && train.calling_points && train.calling_points.length > 0 ? html`
            <div class="calling-points">
              Calling at: ${formatCallingPoints(train.calling_points, this.config.max_calling_points)}
            </div>
          ` : ''}

          ${showJourneyTime && train.journey_duration ? html`
            <div class="journey-time">
              Journey time: ${train.journey_duration} mins${train.journey_time_approx ? '*' : ''}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  _renderCompact() {
    if (this._showSaved) {
      return this._renderSaved();
    }

    const today = new Date().toISOString().split('T')[0];

    return html`
      <ha-card class="${this.config.compact_height ? 'compact-height' : ''}">
        ${this._renderHeader()}
        ${this._renderDisruptionBanner()}

        <div class="card-content compact">
          ${this._trains.map(train => {
            const isFav = this._favorites.has(formatTime(train.scheduled_departure));
            const isFlagged = this._flagged.has(`${today}|${formatTime(train.scheduled_departure)}`);
            return html`
              <div
                class="train-row-compact ${getStatusClass(train)} ${isFav ? 'favourite' : ''} ${isFlagged ? 'flagged' : ''}"
                @click="${() => this._handleTap(train)}"
                @touchstart="${this._handleTouchStart}"
                @touchend="${this._handleTouchEnd}"
                @touchmove="${this._handleTouchMove}"
              >
                ${this._renderTrainActions(train)}
                <span class="time">${formatTime(train.scheduled_departure)}</span>
                <span class="platform">Plat ${train.platform || '—'}</span>
                <span class="status">
                  ${this.config.status_icons !== false ? html`<span class="status-icon">${getStatusIcon(train)}</span>` : ''}
                  ${train.delay_minutes > 0 ? html`<span class="delay-text">+${train.delay_minutes}m</span>` : ''}
                </span>
              </div>
            `;
          })}
        </div>

        ${this._renderFooter()}
      </ha-card>
    `;
  }

  _renderNextOnly() {
    const nextTrain = this._trains[0];

    if (!nextTrain) {
      return this._renderEmpty();
    }

    const statusClass = getStatusClass(nextTrain);
    const statusIcon = this.config.status_icons !== false ? getStatusIcon(nextTrain) : '';

    return html`
      <ha-card class="${this.config.compact_height ? 'compact-height' : ''}">
        ${this._renderHeader()}
        ${this._renderDisruptionBanner()}

        <div class="card-content next-only">
          <div class="next-train-time">
            ${formatTime(nextTrain.scheduled_departure)}
          </div>

          ${nextTrain.expected_departure && nextTrain.expected_departure !== nextTrain.scheduled_departure ? html`
            <div class="next-train-expected">
              Expected: ${formatTime(nextTrain.expected_departure)}
            </div>
          ` : ''}

          <div class="next-train-platform">
            Platform ${nextTrain.platform || '—'}
          </div>

          <div class="next-train-status ${statusClass}">
            ${statusIcon} ${getStatusText(nextTrain)}
          </div>

          ${nextTrain.operator ? html`
            <div class="next-train-operator">
              ${nextTrain.operator}
            </div>
          ` : ''}

          ${nextTrain.calling_points && nextTrain.calling_points.length > 0 ? html`
            <div class="next-train-calling">
              <strong>Calling at:</strong><br>
              ${nextTrain.calling_points.join(', ')}
            </div>
          ` : ''}

          <div class="next-train-actions">
            ${this._renderTrainActions(nextTrain)}
          </div>
        </div>

        ${this._renderFooter()}
      </ha-card>
    `;
  }

  _renderBoard() {
    const today = new Date().toISOString().split('T')[0];
    const showActions = this.config.show_action_buttons !== false;

    return html`
      <ha-card class="departure-board">
        <div class="board-header">
          DEPARTURES  ${this._origin || ''}
        </div>
        ${this._renderDisruptionBanner()}

        <div class="board-content">
          <div class="board-table">
            <div class="board-row board-header-row">
              ${showActions ? html`<span class="col-actions"></span>` : ''}
              <span class="col-time">Time</span>
              <span class="col-dest">Dest</span>
              <span class="col-plat">Plat</span>
              <span class="col-status">Status</span>
            </div>

            ${this._trains.map(train => {
              const isFav = this._favorites.has(formatTime(train.scheduled_departure));
              const isFlagged = this._flagged.has(`${today}|${formatTime(train.scheduled_departure)}`);
              return html`
                <div
                  class="board-row ${getStatusClass(train)} ${isFav ? 'favourite' : ''} ${isFlagged ? 'flagged' : ''}"
                  @click="${() => this._handleTap(train)}"
                  @touchstart="${this._handleTouchStart}"
                  @touchend="${this._handleTouchEnd}"
                  @touchmove="${this._handleTouchMove}"
                >
                  ${showActions ? html`
                    <span class="col-actions">
                      <button
                        class="action-btn fav-btn ${isFav ? 'active' : ''}"
                        @click="${(e) => this._toggleFavorite(train, e)}"
                        title="${isFav ? 'Remove favourite' : 'Mark as favourite'}"
                      ><ha-icon icon="${isFav ? 'mdi:star' : 'mdi:star-outline'}"></ha-icon></button>
                      <button
                        class="action-btn flag-btn ${isFlagged ? 'active' : ''}"
                        @click="${(e) => this._toggleFlag(train, e)}"
                        title="${isFlagged ? 'Remove delay flag' : 'Flag for delay review'}"
                      ><ha-icon icon="${isFlagged ? 'mdi:flag' : 'mdi:flag-outline'}"></ha-icon></button>
                    </span>
                  ` : ''}
                  <span class="col-time">
                    ${formatTime(train.scheduled_departure)}
                  </span>
                  <span class="col-dest">
                    ${abbreviateStation(this._destination || '')}
                  </span>
                  <span class="col-plat">
                    ${train.platform || '—'}
                  </span>
                  <span class="col-status">
                    ${getBoardStatus(train)}
                  </span>
                </div>
              `;
            })}
          </div>
        </div>
      </ha-card>
    `;
  }

  _renderEmpty(message = 'No trains found', submessage = 'Check your time window or station codes') {
    return html`
      <ha-card>
        ${this._renderHeader()}

        <div class="card-content empty">
          <ha-icon icon="mdi:train-variant" class="empty-icon"></ha-icon>
          <div class="empty-message">${message}</div>
          <div class="empty-submessage">${submessage}</div>
        </div>
      </ha-card>
    `;
  }

  _renderLoading() {
    return html`
      <ha-card>
        ${this._renderHeader()}

        <div class="card-content loading">
          <div class="loading-spinner"></div>
          <div class="loading-message">Loading train information...</div>
        </div>
      </ha-card>
    `;
  }

  // ==================== INTERACTION HANDLERS ====================

  _handleTap(train) {
    const action = this.config.tap_action?.action || 'more-info';

    switch (action) {
      case 'more-info':
        this._showMoreInfo(train);
        break;
      case 'url':
        this._openUrl(train);
        break;
      case 'navigate':
        this._navigate(train);
        break;
      case 'none':
      default:
        break;
    }
  }

  _showMoreInfo(train) {
    const event = new Event('hass-more-info', {
      bubbles: true,
      composed: true,
    });

    // Show more info for the individual train if available, otherwise summary
    const entityId = train?.train_id || this.config.entity;

    event.detail = {
      entityId: entityId
    };

    this.dispatchEvent(event);
  }

  _openUrl(train) {
    const url = this.config.tap_action?.url_path;
    if (url) {
      window.open(url, '_blank');
    } else {
      // Default: open National Rail journey planner
      const originCode = this._origin || '';
      const destCode = this._destination || '';
      const journeyUrl = `https://www.nationalrail.co.uk/journey-planner/?from=${originCode}&to=${destCode}`;
      window.open(journeyUrl, '_blank');
    }
  }

  _navigate(train) {
    const path = this.config.tap_action?.navigation_path;
    if (path) {
      window.history.pushState(null, '', path);
      const event = new Event('location-changed', {
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  _handleTouchStart(e) {
    const el = e.currentTarget;
    el._pressTimer = setTimeout(() => {
      el._pressTimer = null;
      this._handleHold();
    }, 500);
  }

  _handleTouchEnd(e) {
    const el = e.currentTarget;
    if (el._pressTimer) {
      clearTimeout(el._pressTimer);
      el._pressTimer = null;
    }
  }

  _handleTouchMove(e) {
    const el = e.currentTarget;
    if (el._pressTimer) {
      clearTimeout(el._pressTimer);
      el._pressTimer = null;
    }
  }

  _handleHold() {
    const action = this.config.hold_action?.action || 'refresh';

    if (action === 'refresh') {
      this._refreshData();
    }
  }

  _refreshData() {
    // Force refresh the entity
    if (this._hass) {
      this._hass.callService('homeassistant', 'update_entity', {
        entity_id: this.config.entity
      });

      // Show visual feedback
      this._showRefreshFeedback();
    }
  }

  _showRefreshFeedback() {
    const toast = document.createElement('div');
    toast.className = 'refresh-toast';
    toast.textContent = 'Refreshing...';
    this.shadowRoot.appendChild(toast);

    this._toastTimer = setTimeout(() => {
      this._toastTimer = null;
      if (toast.isConnected) toast.remove();
    }, 2000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._toastTimer) {
      clearTimeout(this._toastTimer);
      this._toastTimer = null;
    }
  }

  // ==================== CUSTOM CARD HELPERS ====================

  static getConfigElement() {
    return document.createElement('my-rail-commute-card-editor');
  }

  static getStubConfig() {
    return {
      entity: '', // User must select their entity
      view: 'full',
      show_platform: true,
      show_operator: true,
      show_calling_points: false
    };
  }
}

// Register the card
customElements.define('my-rail-commute-card', MyRailCommuteCard);

// Register with card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'my-rail-commute-card',
  name: 'My Rail Commute Card',
  description: 'Display My Rail Commute departure information in a beautiful station-board interface',
  preview: true,
  documentationURL: 'https://github.com/adamf83/lovelace-my-rail-commute-card',
});

export default MyRailCommuteCard;
