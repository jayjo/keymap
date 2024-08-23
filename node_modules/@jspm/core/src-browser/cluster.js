function unimplemented () {
  throw new Error('Node.js cluster is not supported by JSPM core in the browser');
}

export default {
  _events: null,
  _eventsCount: null,
  _maxListeners: null,
  isWorker: null,
  isMaster: null,
  Worker: unimplemented,
  workers: null,
  settings: null,
  SCHED_NONE: null,
  SCHED_RR: null,
  schedulingPolicy: null,
  setupMaster: unimplemented,
  fork: unimplemented,
  disconnect: unimplemented
};

export var _events = null,
  _eventsCount = null,
  _maxListeners = null,
  isWorker = null,
  isMaster = null,
  workers = null,
  settings = null,
  SCHED_NONE = null,
  SCHED_RR = null,
  schedulingPolicy = null;

export {
  unimplemented as Worker,
  unimplemented as setupMaster,
  unimplemented as fork,
  unimplemented as disconnect
}
