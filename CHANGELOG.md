## `main`

**Bug fixes**

- Summary UX mode now surfaces search and summary errors, including when there are 0 search results.

**Non-breaking changes**

- Users can now search for a language instead of having to scroll through a long list.

**Breaking changes**

...

## `1.5.3`

**Non-breaking changes**

- Hotfix: switched default lambdaLong and lambdaShort values

## `1.5.2`

**Non-breaking changes**

- Added support for Hybrid search in configuration
- Added support for reranker ID in the configuration

## `1.5.1`

**Bug fixes**

- Removed use of `any` from `OptionsDrawer`.
- Clicking the search title now clears the search value.

## `1.5.0`

**Bug fixes**

- Fixed bug in which summary wasn't sanitized before reordering it.

**Non-breaking changes**

- Added `OptionsDrawer` for selecting search mode or summary mode.
- Added persistent progress report, including information on how quickly each step completes.
- Added SearchResultsDrawer for reviewing original search results.

## `1.4.0`

**Non-breaking changes**

- Added support for `prompt_name` config.
- Updated `VuiSearchResult` to gracefully handle title and url values that are just whitespace or empty strings.

## `1.3.0`

**Non-breaking changes**

- Added proxy server.
- Added error handling for summary error.

**Inadvertently breaking changes**

- The `enable_summary` config option has been removed. Migrate `enable_summary: True` to `ux: "summary"`
  and `enable_summary: False` to `ux: "search"`.
