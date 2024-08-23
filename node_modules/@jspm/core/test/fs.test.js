import assert from '../nodelibs/browser/assert.js';
import * as fs from '../nodelibs/browser/fs.js';

fs.appendFileSync('/dev/stdout', 'test');
fs.appendFileSync('/dev/stderr', 'test');

assert.deepStrictEqual(fs.readdirSync('/').sort(), ['dev', 'usr', 'home', 'tmp'].sort());
assert.deepStrictEqual(fs.readdirSync('/usr'), ['bin']);

// TODO: test that stdout and stderr are console.logged and console.errored.

assert.deepStrictEqual(fs.readFileSync('/dev/stderr', 'utf8'), 'test');
assert.deepStrictEqual(fs.readFileSync('/dev/stdout', 'utf8'), 'test');
