[![NPM Version](https://img.shields.io/npm/v/inline-source.svg?style=flat)](https://npmjs.org/package/inline-source)
[![Build Status](https://img.shields.io/travis/popeindustries/inline-source.svg?style=flat)](https://travis-ci.org/popeindustries/inline-source)
[![Downloads](https://img.shields.io/npm/dm/inline-source.svg?style=flat)](https://npmjs.org/package/inline-source)

# inline-source

Inline and compress tags that contain the `inline` attribute. Supports `<script>`, `<link>`, and `<img>` (including `*.svg` sources) tags by default, and is easily extensible to handle others.

**NOTE**: since version 6, the API is now Promise based, and compatible with `async/await`, requiring a minimum Node version of 7.6

> You can use [inline-source-cli](https://github.com/developit/inline-source-cli) to run `inline-source` from the command line or NPM Scripts.

## Usage

**`inlineSource(htmlpath, [options]): Promise<string>`**: parse `htmlpath` content for tags containing an `inline` attribute, and replace with (optionally compressed) file contents.

`htmlpath` can be either a filepath _or_ a string of html content.

Available `options` include:

- `attribute`: attribute used to parse sources (all tags will be parsed if set to `false`. Default `'inline'`)
- `compress`: enable/disable compression of inlined content (default `true`)
- `fs`: specify `fs` implementation (default is Node core `'fs'`)
- `handlers`: specify custom handlers (default `[]`) [see [custom handlers](#custom-handlers)]
- `preHandlers`: specify custom pre handlers (default `[]`) [see [custom pre handlers](#custom-pre-handlers)]
- `ignore`: disable inlining based on `tag`, `type`, and/or `format` (default `[]`)
- `pretty`: maintain leading whitespace when `options.compress` is `false` (default `false`)
- `rootpath`: directory path used for resolving inlineable paths (default `process.cwd()`)
- `saveRemote`: enable/disable saving a local copy of remote sources (default `true`)
- `svgAsImage`: convert `<img inline src="*.svg" />` to `<img>` and not `<svg>` (default `false`)
- `swallowErrors`: enable/disable suppression of errors (default `false`)

```bash
$ npm install inline-source
```

```html
<!-- located at project/src/html/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <!-- inline project/www/css/inlineStyle.css as <style> -->
    <link inline href="css/inlineStyle.css" />
    <!-- inline project/src/js/inlineScript.js as <script> -->
    <script inline src="../src/js/inlineScript.js"></script>
    <!-- inline remote file as <script> -->
    <script inline src="http://js/inlineScript.js"></script>
    <!-- inline project/www/images/inlineImage.png as base64 <img> -->
    <img inline src="images/inlineImage.png" />
    <!-- inline project/www/images/inlineImage.svg as <svg> -->
    <img inline src="images/inlineImage.svg" />
  </head>
</html>
```

```javascript
const { inlineSource } = require('inline-source');
const fs = require('fs');
const path = require('path');
const htmlpath = path.resolve('project/src/html/index.html');

inlineSource(htmlpath, {
  compress: true,
  rootpath: path.resolve('www'),
  // Skip all css types and png formats
  ignore: ['css', 'png']
})
  .then((html) => {
    // Do something with html
  })
  .catch((err) => {
    // Handle error
  });
```

...or preferably using `async/await`:

```javascript
const { inlineSource } = require('inline-source');
const fs = require('fs');
const path = require('path');
const htmlpath = path.resolve('project/src/html/index.html');
let html;

try {
  html = await inlineSource(htmlpath, {
    compress: true,
    rootpath: path.resolve('www'),
    // Skip all css types and png formats
    ignore: ['css', 'png']
  });
  // Do something with html
} catch (err) {
  // Handle error
}
```

### Custom Handlers

Custom handlers are simple middleware-type functions that enable you to provide new, or override existing, inlining behaviour. All handlers have the following signature: `(source, context) => Promise`

- `source`: the current source object to act upon

  - `attributes`: the parsed tag attributes object
  - `compress`: the compress flag (may be overriden at the tag level via [props](#props))
  - `content`: the processed `fileContent` string
  - `extension`: the file extension
  - `fileContent`: the loaded file content string
  - `filepath`: the fully qualified path string
  - `format`: the format string (`jpg`, `gif`, `svg+xml`, etc)
  - `match`: the matched html tag string, including closing tag if appropriate
  - `props`: the parsed namespaced attributes object (see [props](#props))
  - `replace`: the tag wrapped `content` string to replace `match`
  - `tag`: the tag string (`script`, `link`, etc)
  - `type`: the content type based on `type` mime-type attribute, or `tag` (`js` for `application/javascript`, `css` for `text/css`, etc)

- `context`: the global context object storing all configuration options (`attribute`, `compress`, `ignore`, `pretty`, `rootpath`, `swallowErrors`, `svgAsImage`), in addtion to:

  - `html`: the html file's content string
  - `htmlpath`: the html file's path string
  - `sources`: the array of `source` objects

Custom handlers are inserted before the defaults, enabling overriding of default behaviour:

```js
module.exports = function handler(source, context) {
  if (source.fileContent && !source.content && source.type == 'js') {
    source.content = "Hey! I'm overriding the file's content!";
  }
};
```

In general, default file content processing will be skipped if `source.content` is already set, and default wrapping of processed content will be skipped if `source.replace` is already set.

### Custom Pre Handlers

Custom pre handlers are the same as custom handlers only they run before loading the file. All handlers have the following signature: `(source, context) => Promise`

With custom Pre handlers you can make changes to the file name

```js
module.exports = function handler(source, context) {
  const { version } = require('../package.json');
  source.filepath = source.filepath.replace('.js', `_${version}.js`);
};
```

### Props

Source `props` are a subset of `attributes` that are namespaced with the current global `attribute` ('inline' by default), and allow declaratively passing data or settings to handlers:

```html
<script
  inline
  inline-foo="foo"
  inline-compress="false"
  src="../src/js/inlineScript.js"
></script>
```

```js
module.exports = function handler(source, context) {
  if (source.fileContent && !source.content && source.type == 'js') {
    // The `inline-compress` attribute automatically overrides the global flag
    if (!source.compress) {
      // do something
    }
    if (source.props.foo == 'foo') {
      // foo content
    }
  }
  return Promise.resolve();
};
```
