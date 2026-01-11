/**
 * Utility functions for UK Rail Commute Card
 */

/**
 * Format ISO time string to HH:MM
 * @param {string} timeStr - ISO time string
 * @returns {string} Formatted time (HH:MM)
 */
export function formatTime(timeStr) {
  if (!timeStr) return '—';

  try {
    const date = new Date(timeStr);
    if (isNaN(date.getTime())) return '—';

    return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  } catch (e) {
    console.error('Error formatting time:', e);
    return '—';
  }
}

/**
 * Get relative time string (e.g., "2 minutes ago")
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Relative time string
 */
export function getRelativeTime(timestamp) {
  if (!timestamp) return 'Unknown';

  try {
    const now = new Date();
    const then = new Date(timestamp);
    const diff = Math.floor((now - then) / 1000); // seconds

    if (diff < 0) return 'Just now';
    if (diff < 60) return 'Just now';
    if (diff < 3600) {
      const mins = Math.floor(diff / 60);
      return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
    }
    if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    const days = Math.floor(diff / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  } catch (e) {
    console.error('Error calculating relative time:', e);
    return 'Unknown';
  }
}

/**
 * Get status class for a train based on its state
 * @param {Object} train - Train object
 * @returns {string} CSS class name
 */
export function getStatusClass(train) {
  if (!train) return 'unknown';

  if (train.is_cancelled) return 'cancelled';
  if (train.delay_minutes >= 10) return 'major-delay';
  if (train.delay_minutes > 0) return 'minor-delay';
  return 'on-time';
}

/**
 * Get status icon for a train
 * @param {Object} train - Train object
 * @param {boolean} useIcons - Whether to use emoji icons
 * @returns {string} Status icon
 */
export function getStatusIcon(train, useIcons = true) {
  if (!useIcons) return '';
  if (!train) return '';

  if (train.is_cancelled) return '❌';
  if (train.delay_minutes >= 10) return '🔴';
  if (train.delay_minutes > 0) return '⚠️';
  return '✓';
}

/**
 * Get status text for a train
 * @param {Object} train - Train object
 * @returns {string} Status text
 */
export function getStatusText(train) {
  if (!train) return 'Unknown';

  if (train.is_cancelled) return 'Cancelled';
  if (train.delay_minutes > 0) {
    return `Delayed ${train.delay_minutes} min${train.delay_minutes !== 1 ? 's' : ''}`;
  }
  return 'On time';
}

/**
 * Get departure board status text (compact format)
 * @param {Object} train - Train object
 * @returns {string} Board status text
 */
export function getBoardStatus(train) {
  if (!train) return 'Unknown';

  if (train.is_cancelled) return 'Cancelled';
  if (train.expected_departure && train.expected_departure !== train.scheduled_departure) {
    return `Exp ${formatTime(train.expected_departure)}`;
  }
  return 'On time';
}

/**
 * Format calling points list
 * @param {Array} points - Array of station names
 * @param {number} maxPoints - Maximum number of points to display
 * @returns {string} Formatted calling points string
 */
export function formatCallingPoints(points, maxPoints = 3) {
  if (!points || points.length === 0) return '';

  const display = points.slice(0, maxPoints);
  const remaining = points.length - maxPoints;

  let text = display.join(', ');
  if (remaining > 0) {
    text += ` +${remaining} more`;
  }
  return text;
}

/**
 * Abbreviate station name for departure board view
 * @param {string} name - Full station name
 * @returns {string} Abbreviated name
 */
export function abbreviateStation(name) {
  if (!name) return '';
  if (name.length <= 12) return name;

  const abbreviations = {
    'London': 'Ldn',
    'Street': 'St',
    'Bridge': 'Bdg',
    'Junction': 'Jn',
    'Central': 'Cen',
    'International': 'Intl',
    'Station': 'Stn',
    'Road': 'Rd',
    'Cross': 'X',
    'Park': 'Pk'
  };

  let abbreviated = name;
  for (const [full, abbr] of Object.entries(abbreviations)) {
    abbreviated = abbreviated.replace(new RegExp(full, 'g'), abbr);
  }

  // If still too long, truncate
  if (abbreviated.length > 12) {
    abbreviated = abbreviated.substring(0, 11) + '…';
  }

  return abbreviated;
}

/**
 * Filter trains based on configuration
 * @param {Array} trains - Array of train objects
 * @param {Object} config - Card configuration
 * @returns {Array} Filtered trains
 */
export function filterTrains(trains, config) {
  if (!trains || trains.length === 0) return [];

  let filtered = [...trains];

  // Filter out on-time trains if configured
  if (config.hide_on_time_trains) {
    filtered = filtered.filter(train =>
      train.is_cancelled || train.delay_minutes > 0
    );
  }

  // Filter by minimum delay
  if (config.min_delay_to_show > 0) {
    filtered = filtered.filter(train =>
      train.is_cancelled || train.delay_minutes >= config.min_delay_to_show
    );
  }

  return filtered;
}

/**
 * Sort trains by scheduled departure time
 * @param {Array} trains - Array of train objects
 * @returns {Array} Sorted trains
 */
export function sortTrains(trains) {
  if (!trains || trains.length === 0) return [];

  return [...trains].sort((a, b) => {
    const timeA = new Date(a.scheduled_departure).getTime();
    const timeB = new Date(b.scheduled_departure).getTime();
    return timeA - timeB;
  });
}

/**
 * Get Material Design Icon name for train status
 * @param {Object} train - Train object
 * @returns {string} MDI icon name
 */
export function getTrainIcon(train) {
  if (!train) return 'mdi:train';

  if (train.is_cancelled) return 'mdi:close-circle';
  if (train.delay_minutes > 0) return 'mdi:train-variant';
  return 'mdi:train';
}

/**
 * Deep merge two objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} Merged object
 */
export function deepMerge(target, source) {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }

  return output;
}

/**
 * Check if value is an object
 * @param {*} item - Value to check
 * @returns {boolean} True if object
 */
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Get color for status
 * @param {string} status - Status class name
 * @param {Object} customColors - Custom color configuration
 * @returns {string} CSS color value
 */
export function getStatusColor(status, customColors = {}) {
  const defaultColors = {
    'on-time': '#4caf50',
    'minor-delay': '#ff9800',
    'major-delay': '#f44336',
    'cancelled': '#d32f2f',
    'unknown': '#9e9e9e'
  };

  const colors = { ...defaultColors, ...customColors };
  return colors[status] || colors.unknown;
}

/**
 * Check if train should be filtered based on disruption settings
 * @param {boolean} hasDisruption - Whether there's disruption
 * @param {boolean} onlyShowDisrupted - Config setting
 * @returns {boolean} Whether to show trains
 */
export function shouldShowTrains(hasDisruption, onlyShowDisrupted) {
  if (!onlyShowDisrupted) return true;
  return hasDisruption;
}

/**
 * Truncate text to maximum length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 1) + '…';
}
