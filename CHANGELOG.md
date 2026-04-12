# Changelog

All notable changes to this project will be documented in this file.

## [1.0.5] - 2026-04-11

### Added
- Release workflow to attach built JS as a release asset
- Show "Entity not found" in card UI when entity is missing

### Fixed
- Fixed show_journey_time toggle by calculating duration from arrival/departure times
- Guard estimated_arrival status text before calculating journey duration
- Compute journey_duration in all_trains data path
- Consistent error handling in formatTime and getRelativeTime utils
- Only trigger release workflow on stable releases, not pre-releases
- Fixed visual editor dropdowns for HA 2026.4 compatibility

## [1.0.4] - 2026-03-17

### Fixed
- Resolved high, medium, and low-severity bugs in card component
- Delay banner no longer bleeds through when reversing a route

## [1.0.3] - 2026-03-14

### Added
- Conditionally show return journey toggle only when a reverse route entity exists

### Fixed
- Show correct train status when `expected_departure` is "Delayed" with no time provided

## [1.0.2] - 2026-02-22

### Changed
- Version bump to 1.0.2

## [1.0.1] - 2026-01-12

### Changed
- Rebranded from "National Rail Commute Card" to "My Rail Commute Card" to match the integration name
- Updated all references, documentation, and file names

## [1.0.0] - 2026-01-11

### Added
- Initial release
- Full view mode with complete train information
- Compact view mode for space-constrained layouts
- Next-only view mode focusing on the immediate next train
- Departure board view mimicking UK railway station boards
- Support for light, dark, and auto themes
- Customizable display options (platform, operator, calling points, delay reasons)
- Interactive tap, hold, and double-tap actions
- Visual card editor for easy configuration
- Status color coding (on-time, minor delay, major delay, cancelled)
- Responsive design for mobile and desktop
- HACS integration
- Example configurations and automations
