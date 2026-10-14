import { LitElement, html, css } from 'lit';
import { styles } from './styles.js';
import {
  formatTime,
  formatPlatform,
  formatDuration,
  formatCallingPoints,
  getStatusIcon,
  getDisruptionReason,
  normalizeTrains,
} from './utils.js';
import { TrainDetailsMixin } from './train-details.js';
import './favourites-editor.js'; // Import editor to bundle it

/**
 * Favourite trains card.
 *
 * A separate card type that reads the additive `favourite_trains` attribute
 * from a My Rail Commute summary sensor. It never touches the main card.
 */

const STATE_INFO = {
  upcoming: { icon: 'mdi:train', cls: 'on-time', label: 'On time' },
  departed: { icon: 'mdi:train-car', cls: 'departed', label: 'Departed' },
  cancelled: { icon: 'mdi:alert-circle', cls: 'cancelled', label: 'Cancelled' },
  scheduled: { icon: 'mdi:clock-outline', cls: 'scheduled', label: 'Later today' },
  not_running: { icon: 'mdi:train-variant', cls: 'not-running', label: 'Not running' },
};

export function describeFavourite(fav) {
  const info = STATE_INFO[fav.state] || STATE_INFO.not_running;
  const delay = Number(fav.delay_minutes) || 0;
  let cls = info.cls;
  let label = info.label;

  if (fav.state === 'upcoming' && delay > 0) {
    label = `Delayed ${delay} min`;
    cls = delay > 10 ? 'major-delay' : 'minor-delay';
  } else if (fav.state === 'departed' && delay > 0) {
    label = `Departed (${delay} min late)`;
  }
  return { icon: info.icon, cls, label };
}

class MyRailCommuteFavouritesCard extends TrainDetailsMixin(LitElement) {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
      _trainDetailsTrain: { type: Object },
    };
  }

  static get styles() {
    return [
      styles,
      css`
        .train-row.departed,
        .train-row.scheduled,
        .train-row.not-running {
          opacity: 0.6;
        }
        .train-row.departed .train-status,
        .train-row.scheduled .train-status,
        .train-row.not-running .train-status {
          color: var(--status-no-service);
        }
        .fav-message {
          padding: var(--card-padding);
          color: var(--secondary-text-color, #757575);
        }
      `,
    ];
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this.config = {
      show_header: true,
      show_platform: true,
      show_operator: true,
      show_delay_reason: true,
      show_calling_points: false,
      show_journey_time: false,
      status_icons: true,
      show_route: true,
      ...config,
    };
  }

  getCardSize() {
    const count = this._getFavourites()?.length || 1;
    return 1 + count;
  }

  _getEntity() {
    if (!this.hass || !this.config?.entity) return null;
    return this.hass.states[this.config.entity] || null;
  }

  _getFavourites() {
    const favs = this._getEntity()?.attributes?.favourite_trains;
    return Array.isArray(favs) ? favs : null;
  }

  willUpdate(changed) {
    // Keep an open details dialog in step with the latest data
    if (this._trainDetailsTrain && changed.has('hass')) {
      const fav = (this._getFavourites() || []).find(
        (f) => f.scheduled_departure === this._trainDetailsTrain.scheduled_departure,
      );
      this._trainDetailsTrain = fav ? this._prepareTrain(fav) : null;
      if (!fav) this._closeTrainDetails();
    }
  }

  _baseName() {
    return (this.config?.entity || '')
      .replace('sensor.', '')
      .replace('_commute_summary', '')
      .replace('_summary', '');
  }

  // The favourite's own sensor (sensor.<name>_favourite_hh_mm), if it exists
  _favouriteEntityId(fav) {
    const id = `sensor.${this._baseName()}_favourite_${String(fav.scheduled_departure).replace(':', '_')}`;
    return this.hass?.states?.[id] ? id : null;
  }

  // Shape a favourite like a main-card train so shared helpers work on it
  _prepareTrain(fav) {
    const [train] = normalizeTrains([{ ...fav, is_cancelled: fav.state === 'cancelled' }], this._baseName());
    train.train_id = this._favouriteEntityId(fav) || undefined;
    return train;
  }

  _getTrainDetailsContext(train) {
    const entity = train.train_id ? this.hass?.states?.[train.train_id] : null;
    const attrs = this._getEntity()?.attributes || {};
    const { cls, label } = describeFavourite(train);
    const live = train.state === 'upcoming' || train.state === 'cancelled';
    // Destination is already in the dialog title, and the main card's dialog doesn't list it
    const hidden = ['state', 'train_id', 'journey_duration', 'journey_time_approx', 'destination'];
    const rawAttrs = Object.fromEntries(
      Object.entries(entity ? entity.attributes : train).filter(([k]) => !hidden.includes(k)),
    );
    return {
      entity,
      rawAttrs,
      originLabel: attrs.origin_name || '',
      destLabel: attrs.destination_name || train.destination || '',
      statusText: label,
      statusClass: live ? cls : 'no-service',
    };
  }

  _handleTap(train) {
    const action = this.config.tap_action?.action || 'train-details';
    switch (action) {
      case 'more-info': {
        const event = new Event('hass-more-info', { bubbles: true, composed: true });
        event.detail = { entityId: train.train_id || this.config.entity };
        this.dispatchEvent(event);
        break;
      }
      case 'train-details':
        this._showTrainDetails(train);
        break;
      case 'url': {
        const url = this.config.tap_action?.url_path;
        if (url) window.open(url, '_blank');
        break;
      }
      case 'navigate': {
        const path = this.config.tap_action?.navigation_path;
        if (path) {
          window.history.pushState(null, '', path);
          this.dispatchEvent(new Event('location-changed', { bubbles: true, composed: true }));
        }
        break;
      }
      default:
        break;
    }
  }

  _handleTouchStart(e) {
    const el = e.currentTarget;
    el._pressTimer = setTimeout(() => {
      el._pressTimer = null;
      this._handleHold();
    }, 500);
  }

  _cancelPress(e) {
    const el = e.currentTarget;
    if (el._pressTimer) {
      clearTimeout(el._pressTimer);
      el._pressTimer = null;
    }
  }

  _handleHold() {
    const action = this.config.hold_action?.action || 'refresh';
    if (action === 'refresh' && this.hass && this.config.entity) {
      this.hass.callService('homeassistant', 'update_entity', { entity_id: this.config.entity });
    } else if (action === 'more-info') {
      const event = new Event('hass-more-info', { bubbles: true, composed: true });
      event.detail = { entityId: this.config.entity };
      this.dispatchEvent(event);
    }
  }

  render() {
    if (!this.config) return html``;

    if (!this.config.entity) {
      return this._renderShell(
        html`<div class="fav-message">Select a My Rail Commute summary sensor in the card configuration.</div>`,
      );
    }

    const entity = this._getEntity();
    if (!entity) {
      return this._renderShell(
        html`<div class="fav-message">Cannot find entity: ${this.config.entity}</div>`,
      );
    }

    const favourites = this._getFavourites();
    if (!favourites || favourites.length === 0) {
      return this._renderShell(
        html`<div class="fav-message">
          No favourite trains yet. Add departure times under <strong>Configure</strong> on the
          My Rail Commute integration (needs a version with favourite trains).
        </div>`,
      );
    }

    return this._renderShell(favourites.map((fav) => this._renderRow(fav)));
  }

  _renderShell(content) {
    const attrs = this._getEntity()?.attributes || {};
    const route = attrs.origin_name && attrs.destination_name
      ? `${attrs.origin_name} → ${attrs.destination_name}`
      : '';
    return html`
      <ha-card>
        ${this.config.show_header !== false ? html`
          <div class="card-header">
            <div class="header-content">
              <ha-icon icon="mdi:star"></ha-icon>
              <span class="header-title">${this.config.title || 'Favourite trains'}</span>
            </div>
            ${route && this.config.show_route !== false ? html`<div class="route">${route}</div>` : ''}
          </div>
        ` : ''}
        ${content}
      </ha-card>
      ${this._trainDetailsTrain ? this._renderTrainDetailsDialog() : ''}
    `;
  }

  _renderRow(fav) {
    const train = this._prepareTrain(fav);
    const { icon, cls, label } = describeFavourite(fav);
    const live = fav.state === 'upcoming' || fav.state === 'cancelled';
    const showExpected = fav.expected_departure && fav.expected_departure !== fav.scheduled_departure
      && fav.state === 'upcoming';
    const statusIcon = live && this.config.status_icons !== false
      ? getStatusIcon({
        is_cancelled: fav.state === 'cancelled',
        delay_minutes: Number(fav.delay_minutes) || 0,
      })
      : '';
    const showDestination = fav.destination
      && fav.destination !== this._getEntity()?.attributes?.destination_name;
    const showPlatform = this.config.show_platform !== false && (live || fav.platform);
    const showOperator = this.config.show_operator !== false && fav.operator;
    const reason = this.config.show_delay_reason !== false ? getDisruptionReason(train) : '';
    const showCallingPoints = this.config.show_calling_points === true && train.calling_points?.length;
    const showJourneyTime = this.config.show_journey_time === true && train.journey_duration;

    return html`
      <div
        class="train-row ${cls}"
        @click="${() => this._handleTap(train)}"
        @touchstart="${this._handleTouchStart}"
        @touchend="${this._cancelPress}"
        @touchmove="${this._cancelPress}"
      >
        <div class="train-main">
          <div class="train-time">
            <ha-icon icon="${icon}"></ha-icon>
            <span class="time">${formatTime(fav.scheduled_departure)}</span>
            <span class="expected-time">${showExpected ? formatTime(fav.expected_departure) : ''}</span>
          </div>
          ${showDestination ? html`<div class="train-destination">→ ${fav.destination}</div>` : ''}
          ${showPlatform ? html`<div class="train-platform">${formatPlatform(fav.platform)}</div>` : ''}
          <div class="train-status">${statusIcon} ${label}</div>
        </div>
        <div class="train-details">
          ${showOperator ? html`<span class="operator">${fav.operator}</span>` : ''}
          ${reason ? html`<div class="delay-reason">→ ${reason}</div>` : ''}
          ${showCallingPoints ? html`
            <div class="calling-points">
              Calling at: ${formatCallingPoints(train.calling_points, this.config.max_calling_points)}
            </div>
          ` : ''}
          ${showJourneyTime ? html`
            <div class="journey-time">
              Journey time: ${formatDuration(train.journey_duration)}${train.journey_time_approx ? '*' : ''}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  static getConfigElement() {
    return document.createElement('my-rail-commute-favourites-card-editor');
  }

  static getStubConfig() {
    return {
      entity: '',
      title: 'Favourite trains',
    };
  }
}

customElements.define('my-rail-commute-favourites-card', MyRailCommuteFavouritesCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'my-rail-commute-favourites-card',
  name: 'My Rail Commute Favourites Card',
  description: 'Show your favourite daily trains from My Rail Commute, including after they have departed',
  preview: false,
  documentationURL: 'https://github.com/adamf83/lovelace-my-rail-commute-card',
});

export default MyRailCommuteFavouritesCard;
