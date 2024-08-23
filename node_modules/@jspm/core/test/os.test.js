import assert from '../nodelibs/browser/assert.js';
import * as os from '../nodelibs/browser/os.js';

assert.strictEqual(os.cpus().length, navigator.hardwareConcurrency);
assert.strictEqual(typeof os.totalmem(), 'number');
assert.strictEqual(typeof os.uptime(), 'number');
assert.ok(['BE', 'LE'].includes(os.endianness()));
