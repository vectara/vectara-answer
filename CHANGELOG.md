## `main`

**Bug fixes**

- Summary UX mode now surfaces search and summary errors, including when there are 0 search results.

**Non-breaking changes**

- Users can now search for a language instead of having to scroll through a long list.

**Breaking changes**

...
## `1.5.8`

**Non-breaking changes**
- Added gtmContainerId config and Analytics package

## `1.5.7`

**Non-breaking changes**
- Update HOSTING.md documentation
- Font for questions - now smaller size
- Surface HEM score (optional)
- Upgrade VUI to latest version 
- making run.sh process more robust to missing secrets.toml file
- do not display references when there is none to display

## `1.5.5`

**Non-breaking changes**

- updated doc to reflect 'url' metadata field usage
- updated all variables to camelCase
- Render summary as Markdown (no-op)
- More detailed hosting docs (for Render)
  
## `1.5.4`

**Non-breaking changes**

- Enable user to search languages using search select. 
- added new languages and fixed display for RTL languages
- update to how "sources" work to enable no "all_source" option
- Implemented MMR (max marginal relevance)

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
