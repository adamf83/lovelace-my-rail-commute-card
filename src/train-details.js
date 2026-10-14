import { html } from 'lit';
import {
  formatTime,
  getStatusClass,
  getStatusText,
  formatCallingPoints,
  formatDuration,
  getAdditionalTrainAttributes,
  getDisruptionReason,
} from './utils.js';

/**
 * Shared "Train details" dialog, used by both the main card and the
 * favourites card. The host class must declare a reactive `_trainDetailsTrain`
 * property and implement `_getTrainDetailsContext(train)`, returning
 * `{ entity, rawAttrs, originLabel, destLabel }` and may add `statusText` /
 * `statusClass` to override the status line.
 */
export const TrainDetailsMixin = (Base) => class extends Base {
  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._trainDetailsEscHandler) {
      document.removeEventListener('keydown', this._trainDetailsEscHandler);
    }
  }

  _showTrainHistory(train, entity) {
    const entityId = entity?.entity_id || train?.train_id;
    if (!entityId) return;
    const event = new Event('hass-more-info', { bubbles: true, composed: true });
    event.detail = { entityId };
    this.dispatchEvent(event);
  }

  // Train sensors are positional slots (e.g. sensor.x_train_0 = "next train"),
  // repointed to a different physical service as trains come and go. HA's
  // native more-info dialog for a sensor entity shows that slot's raw state
  // history, which mixes together unrelated services and is meaningless here.
  // HA also resolves more-info dialogs purely by entity domain, so there's no
  // way to register a richer dialog for just these sensors without affecting
  // the more-info dialog for every sensor entity in the install. tap_action:
  // train-details opens the card's own dialog instead, built from the
  // train's current data.
  _showTrainDetails(train) {
    if (!train) return;
    this._trainDetailsTrain = train;

    if (!this._trainDetailsEscHandler) {
      this._trainDetailsEscHandler = (e) => {
        if (e.key === 'Escape') this._closeTrainDetails();
      };
    }
    document.addEventListener('keydown', this._trainDetailsEscHandler);
  }

  // Stop clicks inside the dialog reaching the overlay (which closes it) and
  // copy the tapped value to the clipboard.
  _onTrainDetailsClick(e) {
    e.stopPropagation();
    const target = e.target.closest ? e.target.closest('.copyable') : null;
    if (target) this._copyToClipboard(target);
  }

  async _copyToClipboard(el) {
    const text = (el.textContent || '').trim();
    if (!text || text === '—') return;
    let copied = false;
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch (err) {
      // navigator.clipboard is unavailable over plain HTTP; fall back below.
    }
    if (!copied) {
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        copied = document.execCommand('copy');
      } catch (err) {
        copied = false;
      }
      area.remove();
    }
    if (!copied) return;
    el.classList.add('copied');
    setTimeout(() => el.classList.remove('copied'), 1200);
  }

  _closeTrainDetails() {
    this._trainDetailsTrain = null;
    if (this._trainDetailsEscHandler) {
      document.removeEventListener('keydown', this._trainDetailsEscHandler);
    }
  }

  // ==================== TRAIN DETAILS DIALOG ====================

  _renderTrainDetailsDialog() {
    const train = this._trainDetailsTrain;
    if (!train) return '';

    // Merge in the entity's full raw attributes when the train is backed by a
    // real sensor (individual-sensor discovery); fall back to the train
    // object itself, which already carries the raw all_trains fields spread
    // onto it (see normalizeTrains) when there's no per-train entity to read.
    const {
      entity, rawAttrs, originLabel, destLabel,
      statusText: statusTextOverride, statusClass: statusClassOverride,
    } = this._getTrainDetailsContext(train);
    const additional = getAdditionalTrainAttributes(rawAttrs);

    const statusText = statusTextOverride || getStatusText(train);
    const statusClass = statusClassOverride || getStatusClass(train);
    const expectedIsTime = /\d{1,2}:\d{2}/.test(String(train.expected_departure || ''));

    return html`
      <div class="train-details-overlay" @click="${this._closeTrainDetails}">
        <div
          class="train-details-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Train details"
          @click="${this._onTrainDetailsClick}"
        >
          <div class="train-details-header">
            <div class="train-details-title">
              <ha-icon icon="mdi:train"></ha-icon>
              <span>${formatTime(train.scheduled_departure)}${originLabel ? html` ${originLabel}` : ''}${destLabel ? html` → ${destLabel}` : ''}</span>
            </div>
            <button class="train-details-close" @click="${this._closeTrainDetails}" title="Close" aria-label="Close">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>

          <div class="train-details-content">
            <div class="train-details-status ${statusClass}">
              ${statusText}${getDisruptionReason(train) ? html` — ${getDisruptionReason(train)}` : ''}
            </div>

            <div class="train-details-grid">
              <div class="train-details-field">
                <span class="field-label">Scheduled departure</span>
                <span class="field-value copyable" title="Tap to copy">${formatTime(train.scheduled_departure)}</span>
              </div>
              <div class="train-details-field">
                <span class="field-label">Expected departure</span>
                <span class="field-value copyable" title="Tap to copy">${expectedIsTime ? formatTime(train.expected_departure) : (train.expected_departure || '—')}</span>
              </div>
              ${train.scheduled_arrival ? html`
                <div class="train-details-field">
                  <span class="field-label">Scheduled arrival</span>
                  <span class="field-value copyable" title="Tap to copy">${formatTime(train.scheduled_arrival)}</span>
                </div>
              ` : ''}
              ${train.estimated_arrival ? html`
                <div class="train-details-field">
                  <span class="field-label">Estimated arrival</span>
                  <span class="field-value copyable" title="Tap to copy">${formatTime(train.estimated_arrival)}</span>
                </div>
              ` : ''}
              <div class="train-details-field">
                <span class="field-label">Platform</span>
                <span class="field-value copyable" title="Tap to copy">${train.platform || '—'}</span>
              </div>
              <div class="train-details-field">
                <span class="field-label">Operator</span>
                <span class="field-value copyable" title="Tap to copy">${train.operator || '—'}</span>
              </div>
              ${train.service_type ? html`
                <div class="train-details-field">
                  <span class="field-label">Service type</span>
                  <span class="field-value copyable" title="Tap to copy">${train.service_type}</span>
                </div>
              ` : ''}
              ${train.journey_duration ? html`
                <div class="train-details-field">
                  <span class="field-label">Journey time</span>
                  <span class="field-value copyable" title="Tap to copy">${formatDuration(train.journey_duration)}${train.journey_time_approx ? ' (approx)' : ''}</span>
                </div>
              ` : ''}
            </div>

            ${train.calling_points && train.calling_points.length ? html`
              <div class="train-details-section">
                <div class="train-details-section-title">Calling at</div>
                <div class="train-details-calling-points copyable" title="Tap to copy">${formatCallingPoints(train.calling_points, train.calling_points.length)}</div>
              </div>
            ` : ''}

            ${additional.length ? html`
              <div class="train-details-section">
                <div class="train-details-section-title">Additional information</div>
                <div class="train-details-grid">
                  ${additional.map(attr => html`
                    <div class="train-details-field">
                      <span class="field-label">${attr.label}</span>
                      <span class="field-value copyable" title="Tap to copy">${attr.value}</span>
                    </div>
                  `)}
                </div>
              </div>
            ` : ''}
          </div>

          ${entity ? html`
            <div class="train-details-footer">
              <button class="train-details-history-link" @click="${() => this._showTrainHistory(train, entity)}">
                <ha-icon icon="mdi:chart-line"></ha-icon>
                View sensor history
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
};
