# Changelog
## [1.0.4] - 2018-09-10
### Fixed
- Fixed inconsistency between documentation and actual behaviour. The documentation says `componentDirectory` but the code is looking for `componentsDirectory`. Both keys now work.
- Fixed issue when matching a folder pattern with no `*`. The expected behaviour is for all files and folders inside the matched folder to be copied accross while keeping the directory structure. Instead nested folders were being ignored.

## [1.0.3] - 2018-08-27
### Added
- Start using eslint
### Fixed
- Fix issue caused by not including a glob in the pattern (e.g., `dist/fonts` instead of `dist/fonts/*`). This caused the last folder in the pattern to be copied to the destination, rather than just the contents of the folder.

## [1.0.2] - 2017-09-28
### Changed
- Fixed sometimes not getting all files by using glob synchronously
- Strip trailing slash from destination path

## [1.0.1] - 2017-09-27
### Changed
- Added badges to readme

## [1.0.0] - 2017-09-27
### Added
- Initial release
