## `main`

**Reverts**

- Reverted `EuiScreenReaderOnly` clip property ([#5150](https://github.com/elastic/eui/pull/5150))

## `2.0.0`

**Breaking changes**

- The `enable_summary` config option has been removed. Migrate `enable_summary: True` to `ux: "summary"`
  and `enable_summary: False` to `ux: "search"`.
