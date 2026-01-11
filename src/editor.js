import { LitElement, html, css } from 'lit';

class UKRailCommuteCardEditor extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object }
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

      .option-label {
        font-weight: 500;
        margin-bottom: 4px;
      }

      .section-header {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 24px 0 12px 0;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--divider-color);
      }

      .section-header:first-child {
        margin-top: 0;
      }

      ha-textfield,
      ha-select {
        width: 100%;
      }

      .switches {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      ha-formfield {
        display: block;
        padding: 8px 0;
      }

      .info {
        font-size: 0.9rem;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
    `;
  }

  setConfig(config) {
    this._config = { ...config }; // Create a copy to ensure reactivity
    this.requestUpdate(); // Force re-render
  }

  set hass(hass) {
    this._hass = hass;
    this.requestUpdate(); // Force re-render when hass changes
  }

  get hass() {
    return this._hass;
  }

  render() {
    if (!this._hass || !this._config) {
      return html``;
    }

    return html`
      <div class="card-config">
        <!-- Basic Configuration -->
        <div class="section-header">Basic Configuration</div>

        <div class="option">
          <ha-entity-picker
            label="Summary Entity (Required)"
            .hass=${this._hass}
            .value=${this._config.entity || ''}
            .includeDomains=${['sensor']}
            @value-changed=${this._entityChanged}
            allow-custom-entity
          ></ha-entity-picker>
          <div class="info">Select your rail commute summary sensor</div>
        </div>

        <div class="option">
          <ha-textfield
            label="Title (Optional)"
            .value=${this._config.title || ''}
            @input=${this._titleChanged}
          ></ha-textfield>
        </div>

        <!-- View & Display -->
        <div class="section-header">View & Display</div>

        <div class="option">
          <ha-select
            label="View Mode"
            .value=${this._config.view || 'full'}
            @selected=${this._viewChanged}
            @closed=${(e) => e.stopPropagation()}
          >
            <mwc-list-item value="full">Full View</mwc-list-item>
            <mwc-list-item value="compact">Compact View</mwc-list-item>
            <mwc-list-item value="next-only">Next Train Only</mwc-list-item>
            <mwc-list-item value="board">Departure Board</mwc-list-item>
          </ha-select>
          <div class="info">Choose how to display train information</div>
        </div>

        <div class="option">
          <ha-select
            label="Theme"
            .value=${this._config.theme || 'auto'}
            @selected=${this._themeChanged}
            @closed=${(e) => e.stopPropagation()}
          >
            <mwc-list-item value="auto">Auto (Follow HA Theme)</mwc-list-item>
            <mwc-list-item value="light">Light</mwc-list-item>
            <mwc-list-item value="dark">Dark</mwc-list-item>
          </ha-select>
        </div>

        <div class="option">
          <ha-select
            label="Font Size"
            .value=${this._config.font_size || 'medium'}
            @selected=${this._fontSizeChanged}
            @closed=${(e) => e.stopPropagation()}
          >
            <mwc-list-item value="small">Small</mwc-list-item>
            <mwc-list-item value="medium">Medium</mwc-list-item>
            <mwc-list-item value="large">Large</mwc-list-item>
          </ha-select>
        </div>

        <!-- Display Options -->
        <div class="section-header">Display Options</div>

        <div class="switches">
          <ha-formfield label="Show Card Header">
            <ha-switch
              .checked=${this._config.show_header !== false}
              @change=${this._toggleChanged('show_header')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Route Information">
            <ha-switch
              .checked=${this._config.show_route !== false}
              @change=${this._toggleChanged('show_route')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Last Updated Time">
            <ha-switch
              .checked=${this._config.show_last_updated === true}
              @change=${this._toggleChanged('show_last_updated')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Platform Numbers">
            <ha-switch
              .checked=${this._config.show_platform !== false}
              @change=${this._toggleChanged('show_platform')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Train Operator">
            <ha-switch
              .checked=${this._config.show_operator !== false}
              @change=${this._toggleChanged('show_operator')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Calling Points">
            <ha-switch
              .checked=${this._config.show_calling_points === true}
              @change=${this._toggleChanged('show_calling_points')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Delay Reasons">
            <ha-switch
              .checked=${this._config.show_delay_reason !== false}
              @change=${this._toggleChanged('show_delay_reason')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Journey Time">
            <ha-switch
              .checked=${this._config.show_journey_time === true}
              @change=${this._toggleChanged('show_journey_time')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Status Icons">
            <ha-switch
              .checked=${this._config.status_icons !== false}
              @change=${this._toggleChanged('status_icons')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Compact Height Mode">
            <ha-switch
              .checked=${this._config.compact_height === true}
              @change=${this._toggleChanged('compact_height')}
            ></ha-switch>
          </ha-formfield>

          <ha-formfield label="Show Animations">
            <ha-switch
              .checked=${this._config.show_animations !== false}
              @change=${this._toggleChanged('show_animations')}
            ></ha-switch>
          </ha-formfield>
        </div>

        <!-- Filtering Options -->
        <div class="section-header">Filtering Options</div>

        <div class="switches">
          <ha-formfield label="Hide On-Time Trains">
            <ha-switch
              .checked=${this._config.hide_on_time_trains === true}
              @change=${this._toggleChanged('hide_on_time_trains')}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="option">
          <ha-textfield
            label="Minimum Delay to Show (minutes)"
            type="number"
            min="0"
            .value=${this._config.min_delay_to_show || 0}
            @input=${this._minDelayChanged}
          ></ha-textfield>
          <div class="info">Only show trains delayed by at least this many minutes (0 = show all)</div>
        </div>

        <div class="option">
          <ha-textfield
            label="Max Calling Points to Display"
            type="number"
            min="1"
            max="20"
            .value=${this._config.max_calling_points || 3}
            @input=${this._maxCallingPointsChanged}
          ></ha-textfield>
        </div>

        <!-- Advanced Options -->
        <div class="section-header">Advanced Options</div>

        <div class="option">
          <ha-entity-picker
            label="Disruption Sensor (Optional)"
            .hass=${this._hass}
            .value=${this._config.disruption_entity || ''}
            .includeDomains=${['binary_sensor']}
            @value-changed=${this._disruptionEntityChanged}
            allow-custom-entity
          ></ha-entity-picker>
          <div class="info">Binary sensor for severe disruption detection</div>
        </div>

        <div class="switches">
          <ha-formfield label="Only Show When Disrupted">
            <ha-switch
              .checked=${this._config.only_show_disrupted === true}
              @change=${this._toggleChanged('only_show_disrupted')}
            ></ha-switch>
          </ha-formfield>
        </div>

        <div class="option">
          <ha-textfield
            label="Auto Refresh Interval (seconds)"
            type="number"
            min="10"
            max="600"
            .value=${this._config.refresh_interval || 60}
            @input=${this._refreshIntervalChanged}
          ></ha-textfield>
        </div>

        <!-- Tap Actions -->
        <div class="section-header">Interaction</div>

        <div class="option">
          <ha-select
            label="Tap Action"
            .value=${this._config.tap_action?.action || 'more-info'}
            @selected=${this._tapActionChanged}
            @closed=${(e) => e.stopPropagation()}
          >
            <mwc-list-item value="more-info">Show More Info</mwc-list-item>
            <mwc-list-item value="url">Open URL</mwc-list-item>
            <mwc-list-item value="navigate">Navigate</mwc-list-item>
            <mwc-list-item value="none">None</mwc-list-item>
          </ha-select>
        </div>

        ${this._config.tap_action?.action === 'url' ? html`
          <div class="option">
            <ha-textfield
              label="URL Path"
              .value=${this._config.tap_action?.url_path || ''}
              @input=${this._urlPathChanged}
            ></ha-textfield>
          </div>
        ` : ''}

        ${this._config.tap_action?.action === 'navigate' ? html`
          <div class="option">
            <ha-textfield
              label="Navigation Path"
              .value=${this._config.tap_action?.navigation_path || ''}
              @input=${this._navigationPathChanged}
            ></ha-textfield>
          </div>
        ` : ''}

        <div class="option">
          <ha-select
            label="Hold Action"
            .value=${this._config.hold_action?.action || 'refresh'}
            @selected=${this._holdActionChanged}
            @closed=${(e) => e.stopPropagation()}
          >
            <mwc-list-item value="refresh">Refresh Data</mwc-list-item>
            <mwc-list-item value="more-info">Show More Info</mwc-list-item>
            <mwc-list-item value="none">None</mwc-list-item>
          </ha-select>
        </div>
      </div>
    `;
  }

  _entityChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    this._config = { ...this._config, entity: ev.detail.value };
    this._fireConfigChanged();
  }

  _titleChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    this._config = { ...this._config, title: ev.target.value };
    this._fireConfigChanged();
  }

  _viewChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    this._config = { ...this._config, view: ev.target.value };
    this._fireConfigChanged();
  }

  _themeChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    this._config = { ...this._config, theme: ev.target.value };
    this._fireConfigChanged();
  }

  _fontSizeChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    this._config = { ...this._config, font_size: ev.target.value };
    this._fireConfigChanged();
  }

  _toggleChanged(key) {
    return (ev) => {
      if (!this._config || !this._hass) {
        return;
      }
      this._config = { ...this._config, [key]: ev.target.checked };
      this._fireConfigChanged();
    };
  }

  _minDelayChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    const value = parseInt(ev.target.value) || 0;
    this._config = { ...this._config, min_delay_to_show: value };
    this._fireConfigChanged();
  }

  _maxCallingPointsChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    const value = parseInt(ev.target.value) || 3;
    this._config = { ...this._config, max_calling_points: value };
    this._fireConfigChanged();
  }

  _disruptionEntityChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    this._config = { ...this._config, disruption_entity: ev.detail.value };
    this._fireConfigChanged();
  }

  _refreshIntervalChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    const value = parseInt(ev.target.value) || 60;
    this._config = { ...this._config, refresh_interval: value };
    this._fireConfigChanged();
  }

  _tapActionChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    this._config = {
      ...this._config,
      tap_action: { action: ev.target.value }
    };
    this._fireConfigChanged();
  }

  _urlPathChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    this._config = {
      ...this._config,
      tap_action: { ...this._config.tap_action, url_path: ev.target.value }
    };
    this._fireConfigChanged();
  }

  _navigationPathChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    this._config = {
      ...this._config,
      tap_action: { ...this._config.tap_action, navigation_path: ev.target.value }
    };
    this._fireConfigChanged();
  }

  _holdActionChanged(ev) {
    if (!this._config || !this._hass) {
      return;
    }
    this._config = {
      ...this._config,
      hold_action: { action: ev.target.value }
    };
    this._fireConfigChanged();
  }

  _fireConfigChanged() {
    const event = new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define('uk-rail-commute-card-editor', UKRailCommuteCardEditor);

export default UKRailCommuteCardEditor;
