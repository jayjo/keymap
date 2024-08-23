import assert from '../nodelibs/browser/assert.js';
import { Worker } from '../nodelibs/browser/worker_threads.js';
import { once } from '../nodelibs/browser/events.js';

const worker = new Worker(`import { parentPort } from 'http://localhost:8080/nodelibs/browser/worker_threads.js';
import { once } from 'http://localhost:8080/nodelibs/browser/events.js';

parentPort.postMessage('hello');
parentPort.postMessage(\`received: \${(await once(parentPort, 'message'))[0]}\`);
`, { eval: true });
worker.postMessage('hello2');

assert.deepStrictEqual(await once(worker, 'message'), ['hello']);
assert.deepStrictEqual(await once(worker, 'message'), ['received: hello2']);
