import { css } from 'lit';

/**
 * Styles for UK Rail Commute Card
 */
export const styles = css`
  :host {
    --status-on-time: var(--custom-on-time-color, #4caf50);
    --status-minor-delay: var(--custom-minor-delay-color, #ff9800);
    --status-major-delay: var(--custom-major-delay-color, #f44336);
    --status-cancelled: var(--custom-cancelled-color, #d32f2f);
    --status-no-service: var(--custom-no-service-color, #9e9e9e);
    --status-unknown: #9e9e9e;

    --card-padding: 16px;
    --row-padding: 12px;
    --border-radius: 8px;

    display: block;
  }

  ha-card {
    padding: 0;
    overflow: hidden;
    position: relative;
  }

  /* ==================== HEADER ==================== */

  .card-header {
    padding: var(--card-padding);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    background: var(--card-background-color, #fff);
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.2rem;
    font-weight: 500;
  }

  .header-title {
    flex: 1;
  }

  .route {
    margin-top: 4px;
    font-size: 0.9rem;
    color: var(--secondary-text-color, #757575);
  }

  /* ==================== DISRUPTION BANNER ==================== */

  .disruption-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px var(--card-padding);
    background: var(--status-major-delay);
    color: #fff;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .disruption-icon {
    --mdc-icon-size: 20px;
    color: #fff;
    flex-shrink: 0;
  }

  .disruption-text {
    flex: 1;
  }

  ha-card.departure-board .disruption-banner {
    background: #b71c1c;
    color: #ffcc00;
    font-family: 'Courier New', Courier, monospace;
    letter-spacing: 1px;
  }

  ha-card.departure-board .disruption-icon {
    color: #ffcc00;
  }

  /* ==================== CONTENT ==================== */

  .card-content {
    padding: 0;
  }

  /* ==================== FULL VIEW ==================== */

  .train-row {
    padding: var(--row-padding) var(--card-padding);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .train-row:hover {
    background-color: var(--secondary-background-color, #f5f5f5);
  }

  .train-row:last-child {
    border-bottom: none;
  }

  .train-main {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 4px;
  }

  .train-time {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;
  }

  .train-time ha-icon {
    --mdc-icon-size: 20px;
    color: var(--secondary-text-color, #757575);
  }

  .time {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--primary-text-color, #212121);
  }

  .expected-time {
    font-size: 1rem;
    color: var(--status-minor-delay);
    margin-left: 4px;
  }

  .train-platform {
    font-size: 0.9rem;
    color: var(--secondary-text-color, #757575);
    flex: 0 0 auto;
  }

  .train-status {
    font-size: 0.9rem;
    font-weight: 500;
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .train-details {
    margin-left: 32px;
    font-size: 0.85rem;
    color: var(--secondary-text-color, #757575);
  }

  .operator {
    font-weight: 500;
  }

  .delay-reason {
    margin-top: 4px;
    font-style: italic;
    color: var(--status-minor-delay);
  }

  .calling-points {
    margin-top: 4px;
  }

  .journey-time {
    margin-top: 4px;
    font-size: 0.8rem;
  }

  /* ==================== STATUS COLORS ==================== */

  .train-row.on-time .train-status {
    color: var(--status-on-time);
  }

  .train-row.minor-delay .train-status {
    color: var(--status-minor-delay);
  }

  .train-row.major-delay .train-status {
    color: var(--status-major-delay);
  }

  .train-row.cancelled {
    opacity: 0.6;
  }

  .train-row.cancelled .train-status {
    color: var(--status-cancelled);
  }

  .train-row.cancelled .time {
    text-decoration: line-through;
  }

  .train-row.no-service {
    opacity: 0.6;
  }

  .train-row.no-service .train-status {
    color: var(--status-no-service);
  }

  /* ==================== COMPACT VIEW ==================== */

  .card-content.compact {
    padding: 8px 0;
  }

  .train-row-compact {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px var(--card-padding);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .train-row-compact:hover {
    background-color: var(--secondary-background-color, #f5f5f5);
  }

  .train-row-compact:last-child {
    border-bottom: none;
  }

  .train-row-compact .time {
    font-size: 1.1rem;
    font-weight: 500;
    flex: 0 0 auto;
    min-width: 60px;
  }

  .train-row-compact .platform {
    font-size: 0.9rem;
    color: var(--secondary-text-color, #757575);
    flex: 1;
    text-align: center;
  }

  .train-row-compact .status {
    font-size: 0.9rem;
    font-weight: 500;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .train-row-compact .status .status-icon {
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .train-row-compact .status .delay-text {
    display: flex;
    align-items: center;
    line-height: 1;
  }

  .train-row-compact.on-time .status {
    color: var(--status-on-time);
  }

  .train-row-compact.minor-delay .status {
    color: var(--status-minor-delay);
  }

  .train-row-compact.major-delay .status {
    color: var(--status-major-delay);
  }

  .train-row-compact.cancelled .status {
    color: var(--status-cancelled);
  }

  .train-row-compact.cancelled .time {
    text-decoration: line-through;
    opacity: 0.6;
  }

  .train-row-compact.no-service .status {
    color: var(--status-no-service);
  }

  .train-row-compact.no-service .time {
    opacity: 0.6;
  }

  /* ==================== NEXT-ONLY VIEW ==================== */

  .card-content.next-only {
    padding: var(--card-padding);
    text-align: center;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .next-train-time {
    font-size: 3rem;
    font-weight: 700;
    margin: 16px 0;
    color: var(--primary-text-color, #212121);
  }

  .next-train-expected {
    font-size: 1rem;
    color: var(--status-minor-delay);
    margin-bottom: 16px;
  }

  .next-train-platform {
    font-size: 1.3rem;
    font-weight: 500;
    margin: 12px 0;
    color: var(--primary-text-color, #212121);
  }

  .next-train-status {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 12px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .next-train-status.on-time {
    color: var(--status-on-time);
  }

  .next-train-status.minor-delay {
    color: var(--status-minor-delay);
  }

  .next-train-status.major-delay {
    color: var(--status-major-delay);
  }

  .next-train-status.cancelled {
    color: var(--status-cancelled);
  }

  .next-train-status.no-service {
    color: var(--status-no-service);
  }

  .next-train-operator {
    font-size: 1rem;
    color: var(--secondary-text-color, #757575);
    margin: 12px 0;
  }

  .next-train-calling {
    margin-top: 16px;
    font-size: 0.9rem;
    text-align: left;
    padding: 12px;
    background: var(--secondary-background-color, #f5f5f5);
    border-radius: var(--border-radius);
    color: var(--primary-text-color, #212121);
  }

  .next-train-calling strong {
    display: block;
    margin-bottom: 8px;
  }

  /* ==================== DEPARTURE BOARD VIEW ==================== */

  ha-card.departure-board {
    background: #1a1a1a;
    color: #ffcc00;
    font-family: 'Courier New', Courier, monospace;
  }

  .board-header {
    padding: var(--card-padding);
    font-size: 1.2rem;
    font-weight: 700;
    text-align: center;
    border-bottom: 2px solid #333;
    letter-spacing: 2px;
  }

  .board-content {
    padding: 0;
  }

  .board-table {
    display: table;
    width: 100%;
    border-collapse: collapse;
  }

  .board-row {
    display: table-row;
  }

  .board-row > span {
    display: table-cell;
    padding: 8px 12px;
    border-bottom: 1px solid #333;
    vertical-align: middle;
  }

  .board-header-row {
    font-weight: 700;
    border-bottom: 2px solid #ffcc00;
  }

  .board-header-row > span {
    border-bottom: 2px solid #ffcc00;
  }

  .board-row:not(.board-header-row) {
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .board-row:not(.board-header-row):hover {
    background-color: #252525;
  }

  .col-time {
    width: 20%;
  }

  .col-dest {
    width: 40%;
  }

  .col-plat {
    width: 15%;
    text-align: center;
  }

  .col-status {
    width: 25%;
  }

  .board-row.cancelled {
    opacity: 0.5;
    text-decoration: line-through;
  }

  .board-row.no-service {
    opacity: 0.5;
  }

  .board-row.major-delay .col-status {
    animation: flash 1s infinite;
  }

  @keyframes flash {
    0%, 50%, 100% { opacity: 1; }
    25%, 75% { opacity: 0.5; }
  }

  /* ==================== FOOTER ==================== */

  .card-footer {
    padding: 8px var(--card-padding);
    border-top: 1px solid var(--divider-color, #e0e0e0);
    font-size: 0.8rem;
    color: var(--secondary-text-color, #757575);
    text-align: center;
    background: var(--card-background-color, #fff);
  }

  /* ==================== EMPTY STATE ==================== */

  .card-content.empty {
    padding: 48px var(--card-padding);
    text-align: center;
  }

  .empty-icon {
    --mdc-icon-size: 64px;
    color: var(--disabled-text-color, #bdbdbd);
    margin-bottom: 16px;
  }

  .empty-message {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--primary-text-color, #212121);
  }

  .empty-submessage {
    font-size: 0.9rem;
    color: var(--secondary-text-color, #757575);
  }

  /* ==================== LOADING STATE ==================== */

  .card-content.loading {
    padding: 48px var(--card-padding);
    text-align: center;
  }

  .loading-spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid var(--divider-color, #e0e0e0);
    border-top-color: var(--primary-color, #03a9f4);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-message {
    margin-top: 16px;
    font-size: 0.9rem;
    color: var(--secondary-text-color, #757575);
  }

  /* ==================== REFRESH TOAST ==================== */

  .refresh-toast {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 24px;
    border-radius: 24px;
    font-size: 0.9rem;
    animation: fadeInOut 2s ease-in-out;
    pointer-events: none;
    z-index: 1000;
  }

  @keyframes fadeInOut {
    0% { opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
  }

  /* ==================== ANIMATIONS ==================== */

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-16px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .train-row,
  .train-row-compact {
    animation: slideIn 0.3s ease-out;
  }

  /* Disable animations if user prefers reduced motion */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ==================== RESPONSIVE ==================== */

  @media (max-width: 600px) {
    .train-main {
      flex-wrap: wrap;
    }

    .time {
      font-size: 1.3rem;
    }

    .next-train-time {
      font-size: 2.5rem;
    }

    .board-row > span {
      padding: 6px 8px;
      font-size: 0.85rem;
    }

    .col-dest {
      width: 35%;
    }

    .col-status {
      width: 30%;
    }
  }

  @media (max-width: 400px) {
    .train-platform {
      flex-basis: 100%;
      margin-left: 32px;
    }

    .card-padding {
      --card-padding: 12px;
    }
  }

  /* ==================== COMPACT HEIGHT MODE ==================== */

  ha-card.compact-height .train-row {
    padding: 8px var(--card-padding);
  }

  ha-card.compact-height .train-main {
    margin-bottom: 0;
  }

  ha-card.compact-height .train-details {
    display: none;
  }

  ha-card.compact-height .card-content.next-only {
    min-height: 150px;
    padding: 12px;
  }

  ha-card.compact-height .next-train-time {
    font-size: 2rem;
    margin: 8px 0;
  }

  /* ==================== CUSTOM THEME OVERRIDES ==================== */

  :host([theme="light"]) ha-card {
    background: #ffffff;
    color: #212121;
  }

  :host([theme="dark"]) ha-card {
    background: #1e1e1e;
    color: #ffffff;
  }

  :host([theme="dark"]) .card-header,
  :host([theme="dark"]) .card-footer {
    background: #2c2c2c;
    border-color: #404040;
  }

  :host([theme="dark"]) .train-row:hover,
  :host([theme="dark"]) .train-row-compact:hover {
    background-color: #2c2c2c;
  }

  :host([theme="dark"]) .train-row,
  :host([theme="dark"]) .train-row-compact {
    border-color: #404040;
  }

  :host([theme="dark"]) .next-train-calling {
    background: #2c2c2c;
  }

  /* ==================== FONT SIZE VARIANTS ==================== */

  :host([font-size="small"]) .time {
    font-size: 1.2rem;
  }

  :host([font-size="small"]) .next-train-time {
    font-size: 2.5rem;
  }

  :host([font-size="large"]) .time {
    font-size: 1.8rem;
  }

  :host([font-size="large"]) .next-train-time {
    font-size: 3.5rem;
  }

  :host([font-size="large"]) .train-details,
  :host([font-size="large"]) .operator {
    font-size: 1rem;
  }

  /* ==================== NO ANIMATIONS MODE ==================== */

  :host([no-animations]) .train-row,
  :host([no-animations]) .train-row-compact,
  :host([no-animations]) * {
    animation: none !important;
    transition: none !important;
  }
`;
