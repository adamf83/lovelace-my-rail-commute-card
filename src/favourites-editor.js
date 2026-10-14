import { LitElement, html, css } from 'lit';

class MyRailCommuteFavouritesCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
    };
  }

  static get styles() {
    return css`
      .card-config {
        padding: 16px;
      }
      .option {
        margin-bottom: 16px;
      }
      ha-textfield {
        width: 100%;
      }
      .native-select-label {
        display: block;
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }
      .native-select-container {
        position: relative;
        width: 100%;
      }
      .native-select-container select {
        width: 100%;
        height: 56px;
        padding: 0 36px 0 16px;
        border: 1px solid var(--divider-color, rgba(0,0,0,0.38));
        border-radius: 4px;
        background: transparent;
        color: var(--primary-text-color);
        font-size: 1rem;
        font-family: inherit;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
        box-sizing: border-box;
      }
      .native-select-container::after {
        content: '';
        position: absolute;
        right: 13px;
        top: 50%;
        transform: translateY(-50%);
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 6px solid var(--secondary-text-color, rgba(0,0,0,0.54));
        pointer-events: none;
      }
    `;
  }

  setConfig(config) {
    this._config = config;
  }

  _update(key, value) {
    const config = { ...this._config, [key]: value };
    if (value === '' || value === undefined) delete config[key];
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    }));
  }

  _updateAction(key, action, extra = {}) {
    const previous = this._config[key]?.action === action ? this._config[key] : {};
    this._update(key, { ...previous, ...extra, action });
  }

  render() {
    if (!this.hass || !this._config) return html``;
    const tap = this._config.tap_action?.action || 'train-details';
    return html`
      <div class="card-config">
        <div class="option">
          <ha-selector
            .hass=${this.hass}
            .label=${'Summary sensor'}
            .selector=${{ entity: { domain: 'sensor' } }}
            .value=${this._config.entity || ''}
            @value-changed=${(e) => this._update('entity', e.detail.value)}
          ></ha-selector>
        </div>
        <div class="option">
          <ha-textfield
            label="Title"
            .value=${this._config.title || ''}
            @input=${(e) => this._update('title', e.target.value)}
          ></ha-textfield>
        </div>
        <div class="option">
          <ha-formfield label="Show header">
            <ha-switch
              .checked=${this._config.show_header !== false}
              @change=${(e) => this._update('show_header', e.target.checked)}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="option">
          <ha-formfield label="Show route">
            <ha-switch
              .checked=${this._config.show_route !== false}
              @change=${(e) => this._update('show_route', e.target.checked)}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="option">
          <ha-formfield label="Show platform">
            <ha-switch
              .checked=${this._config.show_platform !== false}
              @change=${(e) => this._update('show_platform', e.target.checked)}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="option">
          <ha-formfield label="Show operator">
            <ha-switch
              .checked=${this._config.show_operator !== false}
              @change=${(e) => this._update('show_operator', e.target.checked)}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="option">
          <ha-formfield label="Show delay / cancellation reason">
            <ha-switch
              .checked=${this._config.show_delay_reason !== false}
              @change=${(e) => this._update('show_delay_reason', e.target.checked)}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="option">
          <ha-formfield label="Show calling points">
            <ha-switch
              .checked=${this._config.show_calling_points === true}
              @change=${(e) => this._update('show_calling_points', e.target.checked)}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="option">
          <ha-formfield label="Show journey time">
            <ha-switch
              .checked=${this._config.show_journey_time === true}
              @change=${(e) => this._update('show_journey_time', e.target.checked)}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="option">
          <ha-formfield label="Status icons">
            <ha-switch
              .checked=${this._config.status_icons !== false}
              @change=${(e) => this._update('status_icons', e.target.checked)}
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="option">
          <ha-textfield
            label="Max calling points shown"
            type="number"
            min="1"
            max="20"
            .value=${this._config.max_calling_points || 3}
            @input=${(e) => this._update('max_calling_points', e.target.value ? parseInt(e.target.value, 10) : undefined)}
          ></ha-textfield>
        </div>
        <div class="option">
          <span class="native-select-label">Tap Action</span>
          <div class="native-select-container">
            <select @change=${(e) => this._updateAction('tap_action', e.target.value)}>
              ${[['train-details', 'Train Details'], ['more-info', 'Show More Info'], ['url', 'Open URL'], ['navigate', 'Navigate'], ['none', 'None']].map(([value, label]) => html`
                <option value=${value} ?selected=${tap === value}>${label}</option>
              `)}
            </select>
          </div>
        </div>
        ${tap === 'url' ? html`
          <div class="option">
            <ha-textfield
              label="URL Path"
              .value=${this._config.tap_action?.url_path || ''}
              @input=${(e) => this._updateAction('tap_action', 'url', { url_path: e.target.value })}
            ></ha-textfield>
          </div>
        ` : ''}
        ${tap === 'navigate' ? html`
          <div class="option">
            <ha-textfield
              label="Navigation Path"
              .value=${this._config.tap_action?.navigation_path || ''}
              @input=${(e) => this._updateAction('tap_action', 'navigate', { navigation_path: e.target.value })}
            ></ha-textfield>
          </div>
        ` : ''}
        <div class="option">
          <span class="native-select-label">Hold Action</span>
          <div class="native-select-container">
            <select @change=${(e) => this._updateAction('hold_action', e.target.value)}>
              ${[['refresh', 'Refresh Data'], ['more-info', 'Show More Info'], ['none', 'None']].map(([value, label]) => html`
                <option value=${value} ?selected=${(this._config.hold_action?.action || 'refresh') === value}>${label}</option>
              `)}
            </select>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('my-rail-commute-favourites-card-editor', MyRailCommuteFavouritesCardEditor);
