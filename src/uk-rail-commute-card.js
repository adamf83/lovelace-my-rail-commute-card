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
  shouldShowTrains
} from './utils.js';
import './editor.js'; // Import editor to bundle it

console.info(
  '%c UK-RAIL-COMMUTE-CARD \n%c Version 1.0.0 ',
  'color: cyan; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

class UKRailCommuteCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _trains: { type: Array },
      _origin: { type: String },
      _destination: { type: String },
      _lastUpdated: { type: String },
      _hasDisruption: { type: Boolean },
      _loading: { type: Boolean }
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
    this._loading = true;
    this._pressTimer = null;
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

    // Extract train data - try multiple sources
    if (summaryEntity.attributes.all_trains && summaryEntity.attributes.all_trains.length > 0) {
      // Method 1: Direct all_trains attribute from integration
      // Add train_id based on entity naming pattern
      const baseName = this.config.entity.replace('sensor.', '').replace('_summary', '').replace('_commute_summary', '');
      this._trains = summaryEntity.attributes.all_trains.map((train, index) => ({
        ...train,
        train_id: `sensor.${baseName}_train_${train.train_number || (index + 1)}` // Add train_id for click handler
      }));
    } else {
      // Method 2: Auto-discover individual train sensors
      this._trains = this._getTrainsFromIndividualSensors(hass);
    }

    // Get route information
    this._origin = summaryEntity.attributes.origin_name ||
                   summaryEntity.attributes.origin ||
                   summaryEntity.attributes.from_station || '';
    this._destination = summaryEntity.attributes.destination_name ||
                        summaryEntity.attributes.destination ||
                        summaryEntity.attributes.to_station || '';
    this._lastUpdated = summaryEntity.attributes.last_updated ||
                        summaryEntity.last_updated ||
                        summaryEntity.last_changed || '';

    // Sort and filter trains
    if (this._trains && this._trains.length > 0) {
      this._trains = sortTrains(this._trains);
      this._trains = filterTrains(this._trains, this.config);
    }

    // Get disruption sensor if configured
    if (this.config.disruption_entity) {
      const disruptionEntity = hass.states[this.config.disruption_entity];
      this._hasDisruption = disruptionEntity?.state === 'on';
    }

    this._loading = false;
    this.requestUpdate();
  }

  _getTrainsFromIndividualSensors(hass) {
    // Auto-discover train sensors based on entity naming pattern
    const baseName = this.config.entity
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
      const numA = parseInt(a.match(/train[_-]?(\d+)$/i)?.[1] || '0');
      const numB = parseInt(b.match(/train[_-]?(\d+)$/i)?.[1] || '0');
      return numA - numB;
    });

    const trains = trainSensors.map(entityId => {
      const entity = hass.states[entityId];
      if (!entity) return null;

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
        delay_minutes: parseInt(entity.attributes.delay_minutes ||
                               entity.attributes.delay ||
                               entity.attributes.minutes_late ||
                               entity.attributes['Delay minutes'] ||
                               '0'),
        delay_reason: entity.attributes.delay_reason ||
                     entity.attributes.reason ||
                     entity.attributes['Delay reason'] || '',
        calling_points: callingPoints,
        journey_duration: entity.attributes.journey_duration ||
                         entity.attributes.duration || '',
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
        </div>
        ${showRoute && this._origin && this._destination ? html`
          <div class="route">
            ${this._origin} → ${this._destination}
          </div>
        ` : ''}
      </div>
    `;
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
    const compactClass = this.config.compact_height ? 'compact-height' : '';

    return html`
      <ha-card class="${compactClass}">
        ${this._renderHeader()}

        <div class="card-content">
          ${this._trains.map(train => this._renderTrainRow(train))}
        </div>

        ${this._renderFooter()}
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

    return html`
      <div
        class="train-row ${statusClass}"
        @click="${() => this._handleTap(train)}"
        @touchstart="${this._handleTouchStart}"
        @touchend="${this._handleTouchEnd}"
        @touchmove="${this._handleTouchMove}"
      >
        <div class="train-main">
          <div class="train-time">
            <ha-icon icon="${getTrainIcon(train)}"></ha-icon>
            <span class="time">${formatTime(train.scheduled_departure)}</span>
            ${train.expected_departure && train.expected_departure !== train.scheduled_departure ? html`
              <span class="expected-time">${formatTime(train.expected_departure)}</span>
            ` : ''}
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
              Journey time: ${train.journey_duration} mins
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  _renderCompact() {
    return html`
      <ha-card class="${this.config.compact_height ? 'compact-height' : ''}">
        ${this._renderHeader()}

        <div class="card-content compact">
          ${this._trains.map(train => html`
            <div
              class="train-row-compact ${getStatusClass(train)}"
              @click="${() => this._handleTap(train)}"
              @touchstart="${this._handleTouchStart}"
              @touchend="${this._handleTouchEnd}"
              @touchmove="${this._handleTouchMove}"
            >
              <span class="time">${formatTime(train.scheduled_departure)}</span>
              <span class="platform">Plat ${train.platform || '—'}</span>
              <span class="status">
                ${this.config.status_icons !== false ? getStatusIcon(train) : ''}
                ${train.delay_minutes > 0 ? ` +${train.delay_minutes}m` : ''}
              </span>
            </div>
          `)}
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
        </div>

        ${this._renderFooter()}
      </ha-card>
    `;
  }

  _renderBoard() {
    return html`
      <ha-card class="departure-board">
        <div class="board-header">
          DEPARTURES  ${this._origin || ''}
        </div>

        <div class="board-content">
          <div class="board-table">
            <div class="board-row board-header-row">
              <span class="col-time">Time</span>
              <span class="col-dest">Dest</span>
              <span class="col-plat">Plat</span>
              <span class="col-status">Status</span>
            </div>

            ${this._trains.map(train => html`
              <div
                class="board-row ${getStatusClass(train)}"
                @click="${() => this._handleTap(train)}"
                @touchstart="${this._handleTouchStart}"
                @touchend="${this._handleTouchEnd}"
                @touchmove="${this._handleTouchMove}"
              >
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
            `)}
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
    this._pressTimer = setTimeout(() => {
      this._handleHold();
    }, 500);
  }

  _handleTouchEnd() {
    if (this._pressTimer) {
      clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
  }

  _handleTouchMove() {
    if (this._pressTimer) {
      clearTimeout(this._pressTimer);
      this._pressTimer = null;
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

    setTimeout(() => {
      toast.remove();
    }, 2000);
  }

  // ==================== CUSTOM CARD HELPERS ====================

  static getConfigElement() {
    return document.createElement('uk-rail-commute-card-editor');
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
customElements.define('uk-rail-commute-card', UKRailCommuteCard);

// Register with card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'uk-rail-commute-card',
  name: 'UK Rail Commute Card',
  description: 'Display UK rail departure information in a beautiful station-board interface',
  preview: true,
  documentationURL: 'https://github.com/yourusername/lovelace-uk-rail-commute-card',
});

export default UKRailCommuteCard;
