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

  render() {
    if (!this.hass || !this._config) return html``;
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
              .checked=${this._config.show_operator === true}
              @change=${(e) => this._update('show_operator', e.target.checked)}
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `;
  }
}

customElements.define('my-rail-commute-favourites-card-editor', MyRailCommuteFavouritesCardEditor);
