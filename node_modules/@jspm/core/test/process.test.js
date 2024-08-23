import assert from '../nodelibs/browser/assert.js';
import * as process from '../nodelibs/browser/process.js';

assert.strictEqual(process.cwd(), '/');

assert.strictEqual(process.cwd(), '/');

assert.strictEqual(typeof process.uptime(), 'number');
assert.ok(process.uptime() >= 0);
assert.strictEqual(process.hrtime().length, 2);
assert.strictEqual(typeof process.hrtime()[0], 'number');
assert.strictEqual(typeof process.hrtime()[1], 'number');
assert.ok(process.hrtime()[0] > 0);
assert.ok(process.hrtime()[1] >= 0);
assert.strictEqual(typeof process.hrtime.bigint(), typeof BigInt === 'undefined' ? 'number' : 'bigint');
