# Changelog

All notable changes to Grove are documented here.

## [1.0.1] - 2026-05-31

### Changed
- Kanban is now a **workflow board**: columns are To Do, In Progress, and Done. Drag cards between columns to update stage. Priority and Active/Done filters are hidden in Kanban; List, Compact, and Matrix still show priority.
- Linux downloads now use native `.deb` and `.rpm` packages instead of AppImage, so Grove installs into the app launcher like a normal desktop app.

### Added
- **Mobile PWA** at [grove-todo.vercel.app/app/](https://grove-todo.vercel.app/app/): installable web app with phone layout (`mobile.css`), horizontal Kanban lanes, filters drawer, task action sheet, install banner, and lightweight service worker. See README and `docs/MOBILE-NATIVE.md`.

### Fixed
- Category color dots render reliably on Linux (CSS-based colors instead of fragile inline styles).
- Priority orb color transitions now match list view in kanban and matrix views before cards move columns.
