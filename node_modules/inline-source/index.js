'use strict';

const { isFilepath } = require('./lib/utils');
const context = require('./lib/context');
const path = require('path');
const parse = require('./lib/parse');
const run = require('./lib/run');

/**
 * Inline sources found in 'htmlpath'
 * @param {String} htmlpath
 * @param {Object} options
 *  - {String} attribute
 *  - {Boolean} compress
 *  - {Object} fs
 *  - {Array} handlers
 *  - {Array} ignore
 *  - {Boolean} pretty
 *  - {String} rootpath
 *  - {Boolean} swallowErrors
 *  - {Boolean} svgAsImage
 * @returns {Promise<String>}
 */
exports.inlineSource = function inlineSource(htmlpath, options = {}) {
  return new Promise(async (resolve, reject) => {
    const ctx = context.create(options);

    // Load html content
    if (isFilepath(htmlpath)) {
      ctx.htmlpath = path.resolve(htmlpath);
      try {
        ctx.html = ctx.fs.readFileSync(ctx.htmlpath, 'utf8');
      } catch (err) {
        return reject(err);
      }
      // Passed file content instead of path
    } else {
      ctx.html = htmlpath;
    }

    try {
      await parse(ctx);
      if (ctx.sources.length > 0) {
        await run(ctx, ctx.sources, ctx.swallowErrors);
      }
    } catch (err) {
      return reject(err);
    }

    resolve(ctx.html);
  });
};
