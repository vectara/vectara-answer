# Changelog

***Release notes have moved to GitHub [releases page](https://github.com/popeindustries/inline-source/releases)***

**5.1.4** - Jan 03, 2017
* improve handling of source paths with query params

**5.1.3** - Dec 16, 2016
* fix handling of source paths with query params [#49](https://github.com/popeindustries/inline-source/issues/49)

**5.1.2** - Nov 8, 2016
* update dependencies

**5.1.1** - Oct 3, 2016
* update/prune dependencies
* lazily initialise compressors

**5.1.0** - Sept 26, 2016
* expose configuration of `fs` library for integration with Webpack, for example (via [memory-fs](https://github.com/webpack/memory-fs)) [#47](https://github.com/popeindustries/inline-source/pull/47)

**5.0.2** - Sept 14, 2016
* fix escaping of `</script>` tags in inlined js content

**5.0.1** - Aug 29, 2016
* update dependencies
* add support for "inline='inline'" attribute [#44](https://github.com/popeindustries/inline-source/pull/44)

**5.0.0** - Aug 11, 2016
* remove default svg attributes [#41](https://github.com/popeindustries/inline-source/issues/41)
* add support for inlining svg symbol fragments [#31](https://github.com/popeindustries/inline-source/issues/31)

**4.4.0** - Aug 11, 2016
* add support for "inline='true'" attribute [#42](https://github.com/popeindustries/inline-source/pull/42)

**4.3.0** - Aug 9, 2016
* update dependencies
* add support for inlining favicons [#39](https://github.com/popeindustries/inline-source/issues/39)

**4.2.6** - July 8, 2016
* update dependencies
* fix parse error [#38](https://github.com/popeindustries/inline-source/issues/38)

**4.2.5** - Apr 27, 2016
* update dependencies

**4.2.4** - Mar 9, 2016
* prevent removal of empty `<svg>` attributes (fixes `<image>` fallback hack)

**4.2.3** - Feb 28, 2016
* fix inlining of svg images when content includes `<image>` elements (enables fallbacks for inlined svg)
* update dependencies

**4.2.2** - Nov 30, 2015
* fix inlining of svg images when content includes unused `<symbol>` elements (enables inlining of symbol definitions file for use with inline icons, for example)
* update dependencies

**4.2.1** - Nov 12, 2015
* fix inlining of svg images when `<svg>` contains a line break (looking at you Illustrator!)
* update dependencies

**4.2.0** - Oct 4, 2015
* fix handling of svg attributes
* add support for inlining svg with `<object>` tag

**4.1.1** - Sept 2, 2015
* update dependencies

**4.1.0** - Sept 2, 2015
* correctly set attributes when inlining svg
* add support for setting `svgAsImage` via attribute (`inline-svgAsImage`, for example)

**4.0.0** - May 18, 2015
* simplify `ignore` option to accept string or array of tags/types/format
* add support for inlining images (base64) and svg (inline `<svg>` or base64 via `options.svgAsImage`)

**3.0.0** - May 17, 2015
* add sync api
* update uglify-js dependency

**2.1.0** - May 2, 2015
* allow tags in conditional comments to be parsed
* update lodash dependency

**2.0.1** - Apr 24, 2015
* update lodash and uglify-js dependencies

**2.0.0** - Apr 24, 2015
* add support for custom handlers
* add support for `props` and declaratively passing data to custom handlers
* replace `inline*` options with `ignore` to specify by `tag` or `type`
* change api to remove optional `html` argument
* change api to be asynchronous, accepting a passed callback
* complete rewrite

**1.3.0** - Feb 13, 2015
* don't remote `inline` attribute when `options.inlineXXX` is `false`

**1.2.0** - Feb 5, 2015
* add support for pretty printing source contents with `options.pretty`
* add support for disabling js or css with `options.inlineJS` and `options.inlineCSS`