import { once, EventEmitter } from './events.js';
import './chunk-4bd36a8f.js';

function unimplemented(name) {
  throw new Error(
    `Node.js worker_threads ${name} is not currently supported by JSPM core in Deno`,
  );
}

let environmentData = new Map();
let threads = 0;

const kHandle = Symbol('kHandle');
class Worker extends EventEmitter {
  resourceLimits = {
    maxYoungGenerationSizeMb: -1,
    maxOldGenerationSizeMb: -1,
    codeRangeSizeMb: -1,
    stackSizeMb: 4,
  };

  constructor(specifier, options) {
    super();
    if (options?.eval === true) {
      specifier = URL.createObjectURL(new Blob([specifier], { type: 'application/javascript' }));
    }
    const handle = this[kHandle] = new globalThis.Worker(specifier, {
      ...(options || {}),
      type: 'module',
    });
    handle.addEventListener('error', (event) => this.emit('error', event.error || event.message));
    handle.addEventListener('messageerror', (event) => this.emit('messageerror', event.data));
    handle.addEventListener('message', (event) => this.emit('message', event.data));
    handle.postMessage({
      environmentData,
      threadId: (this.threadId = ++threads),
      workerData: options?.workerData,
    }, options?.transferList);
    this.postMessage = handle.postMessage.bind(handle);
    this.emit('online');
  }

  terminate() {
    this[kHandle].terminate();
    this.emit('exit', 0);
  }

  getHeapSnapshot = () => unimplemented('Worker#getHeapsnapshot');
  // fake performance
  performance = globalThis.performance;
}

const isMainThread = typeof WorkerGlobalScope === 'undefined' || self instanceof WorkerGlobalScope === false;

// fake resourceLimits
const resourceLimits = isMainThread ? {} : {
  maxYoungGenerationSizeMb: 48,
  maxOldGenerationSizeMb: 2048,
  codeRangeSizeMb: 0,
  stackSizeMb: 4,
};

let threadId = 0;
let workerData = null;
let parentPort = null;

if (!isMainThread) {
  const listeners = new WeakMap();
  parentPort = self;
  parentPort.off = parentPort.removeListener = function (name, listener) {
    this.removeEventListener(name, listeners.get(listener));
    listeners.delete(listener);
    return this;
  };
  parentPort.on = parentPort.addListener = function (name, listener) {
    const _listener = (ev) => listener(ev.data);
    listeners.set(listener, _listener);
    this.addEventListener(name, _listener);
    return this;
  };
  parentPort.once = function (name, listener) {
    const _listener = (ev) => listener(ev.data);
    listeners.set(listener, _listener);
    this.addEventListener(name, _listener);
    return this;
  };

  // mocks
  parentPort.setMaxListeners = () => {};
  parentPort.getMaxListeners = () => Infinity;
  parentPort.eventNames = () => [];
  parentPort.listenerCount = () => 0;

  parentPort.emit = () => notImplemented();
  parentPort.removeAllListeners = () => notImplemented();

  ([{ threadId, workerData, environmentData }] = await once(parentPort, 'message'));

  // alias
  parentPort.addEventListener('offline', () => parentPort.emit('close'));
}

function getEnvironmentData(key) {
  return environmentData.get(key);
}

function setEnvironmentData(key, value) {
  if (value === undefined) {
    environmentData.delete(key);
  } else {
    environmentData.set(key, value);
  }
}

const markAsUntransferable = () => unimplemented('markAsUntransferable');
const moveMessagePortToContext = () => unimplemented('moveMessagePortToContext');
const receiveMessageOnPort = () => unimplemented('receiveMessageOnPort');
const MessagePort = globalThis.MessagePort;
const MessageChannel = globalThis.MessageChannel;
const BroadcastChannel = globalThis.BroadcastChannel;
const SHARE_ENV = Symbol.for('nodejs.worker_threads.SHARE_ENV');

var worker_threads = {
  markAsUntransferable,
  moveMessagePortToContext,
  receiveMessageOnPort,
  MessagePort,
  MessageChannel,
  BroadcastChannel,
  Worker,
  getEnvironmentData,
  setEnvironmentData,
  SHARE_ENV,
  threadId,
  workerData,
  resourceLimits,
  parentPort,
  isMainThread,
};

export { BroadcastChannel, MessageChannel, MessagePort, SHARE_ENV, Worker, worker_threads as default, getEnvironmentData, isMainThread, markAsUntransferable, moveMessagePortToContext, parentPort, receiveMessageOnPort, resourceLimits, setEnvironmentData, threadId, workerData };
