import { LitElement, html, css } from 'lit';
import { styles } from './styles.js';
import { formatTime, formatPlatform, getStatusIcon } from './utils.js';
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

class MyRailCommuteFavouritesCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object },
    };
  }

  static get styles() {
    return [
      styles,
      css`
        .train-row {
          cursor: default;
        }
        .train-row:hover {
          background-color: transparent;
        }
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
        .train-row .train-details:empty {
          display: none;
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
            ${route ? html`<div class="route">${route}</div>` : ''}
          </div>
        ` : ''}
        ${content}
      </ha-card>
    `;
  }

  _renderRow(fav) {
    const { icon, cls, label } = describeFavourite(fav);
    const live = fav.state === 'upcoming' || fav.state === 'cancelled';
    const showExpected = fav.expected_departure && fav.expected_departure !== fav.scheduled_departure
      && fav.state === 'upcoming';
    const statusIcon = live
      ? getStatusIcon({
        is_cancelled: fav.state === 'cancelled',
        delay_minutes: Number(fav.delay_minutes) || 0,
      })
      : '';
    const showDestination = fav.destination
      && fav.destination !== this._getEntity()?.attributes?.destination_name;
    const showPlatform = this.config.show_platform !== false && (live || fav.platform);
    const showOperator = this.config.show_operator !== false && fav.operator;
    const reason = fav.state === 'cancelled'
      ? fav.cancel_reason || fav.cancellation_reason
      : fav.delay_reason;

    return html`
      <div class="train-row ${cls}">
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
