# Changelog

All notable changes to Grove are documented here.

## [1.0.2] - 2026-06-04

### Added
- Optional **Done by** date and time when creating a task (desktop, mobile PWA, and Android APK).
- **Windows desktop app:** opt-in system notification when a task reaches its due time (Settings → Due-time alerts).
- In-app reminder toast at due time on macOS and Linux desktop until OS notifications roll out on those platforms.
- **Android (v1.0.2):** task **Edit** in the action sheet; Pomodoro keeps time via wall-clock resume and phase-end notifications; matrix quadrant drill-in and drag-to-move; kanban subtasks stack under the card.

### Fixed
- **Android:** duplicate Edit control in task actions header removed; Pomodoro no longer appears frozen after the phone sleeps.

### Notes
- Use the **Windows installer** from GitHub Releases for reliable toast notifications; a loose `.exe` moved outside the install folder may not notify ([Tauri #11757](https://github.com/tauri-apps/tauri/issues/11757)).
- Due-time alerts require the app to keep running (tray is fine); fully quitting may delay reminders until the next launch.

## [1.0.1] - 2026-05-31

### Changed
- Kanban is now a **workflow board**: columns are To Do, In Progress, and Done. Drag cards between columns to update stage. Priority and Active/Done filters are hidden in Kanban; List, Compact, and Matrix still show priority.
- Linux downloads now use native `.deb` and `.rpm` packages instead of AppImage, so Grove installs into the app launcher like a normal desktop app.

### Added
- **Mobile PWA** at [grove-todo.vercel.app/app/](https://grove-todo.vercel.app/app/): installable web app with phone layout (`mobile.css`), horizontal Kanban lanes, filters drawer, task action sheet, install banner, and lightweight service worker. See README and `docs/MOBILE-NATIVE.md`.

### Fixed
- Category color dots render reliably on Linux (CSS-based colors instead of fragile inline styles).
- Priority orb color transitions now match list view in kanban and matrix views before cards move columns.
