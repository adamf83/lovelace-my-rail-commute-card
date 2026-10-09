# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Delay Repay claim assistant (opt-in via `show_delay_repay`): footer button with an unclaimed-journeys badge, a claims panel with "Mark claimed" and "Dismiss" actions, and a "Claim" chip on late or cancelled trains. Needs Delay Repay tracking enabled in the integration
- Visual editor toggle for `show_delay_repay`

### Fixed
- Delay Repay: "Mark claimed" and "Dismiss" did nothing because the claims sensor did not expose its config entry ID. The card now falls back to the entity registry and shows an error if the entry cannot be found (the integration also now exposes `entry_id`)
- Delay Repay: tapping "Claim" on a live late or cancelled train opened an empty panel because only finished journeys were listed. In-progress journeys are now shown (with the integration's `pending_claims` attribute), and the chip only appears on trains the integration has recorded

## [1.0.9] - 2026-09-28

### Added
- Per-train destination shown in Full/Compact/Next-Only views for all-departures mode, matching the Departure Board view

### Fixed
- Show the cancellation reason on cancelled trains, including when sourced from the `all_trains` attribute under a different key name

## [1.0.8] - 2026-09-23

### Added
- Full train details dialog on tap, showing scheduled/expected departure, scheduled/estimated arrival, platform, operator, status, delay reason, journey time, and calling points
- New `train-details` tap action, separate from `more-info`, to open the card's own dialog

### Changed
- `tap_action: more-info` now opens Home Assistant's native more-info popup again instead of the card's custom dialog

### Fixed
- Show origin station in the train details dialog title
- Don't prefix "Platform"/"Plat" label for rail replacement bus services (platform text already mentions "via Bus")

## [1.0.7] - 2026-07-25

### Changed
- Version bump to 1.0.7

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
