'use strict';

const { expect } = require('chai');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readFile = util.promisify(require('fs').readFile);

describe('Inline Source CLI', () => {
  it('should inline the file properly', async () => {
    await exec('node dist/index.js test/fixtures/foo.html test/out/foo.html');
    // check the file
    const data = await readFile('test/out/foo.html', 'utf8');
    expect(data).to.equal(
      '<script>var foo = this;\nconsole.log(foo);\n</script>\n'
    );
  });

  it('should inline and compress the file properly', async () => {
    await exec(
      'node dist/index.js --compress test/fixtures/foo.html test/out/foo.html'
    );
    // check the file
    const data = await readFile('test/out/foo.html', 'utf8');
    expect(data).to.equal('<script>var foo=this;console.log(foo);</script>\n');
  });
});
