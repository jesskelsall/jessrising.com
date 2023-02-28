# jessrising.com

V2 in development.

## TODO

- Server side rendered gallery:
  - Interactive filtering system.
    - Flat list of tags.
    - Locations provide more specific options when selected.
    - Year and month separately selectable.
    - Show total photos on each option if it were selected.
    - Grey out (still clickable) options when selecting them would yield 0 results.
- Location inheritance system:
  - Manifest of each location and its parent location (JSON k/v pairs).
  - Countries at top level with null parent.
  - Runtime error when a location can't be found in the manifest.
  - Locations only need the most specific level.
  - UI only shows most specific but has expansion/pop-up button to see all levels.
  - Clicking a location opens the gallery with that location filter applied, page 1.
- More complex locations:
  - Location (where the photo was taken from).
  - Subjects (locations seen in the photo, if different).
- Hot reloading:
  - Development environment - saving markdown files & images shows immediate changes.
  - Production environment - data pre-built and used each time.
  - Environment variable switch in logic.
