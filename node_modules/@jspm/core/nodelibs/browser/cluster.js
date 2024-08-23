function unimplemented () {
  throw new Error('Node.js cluster is not supported by JSPM core in the browser');
}

var cluster = {
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

var _events = null,
  _eventsCount = null,
  _maxListeners = null,
  isWorker = null,
  isMaster = null,
  workers = null,
  settings = null,
  SCHED_NONE = null,
  SCHED_RR = null,
  schedulingPolicy = null;

export { SCHED_NONE, SCHED_RR, unimplemented as Worker, _events, _eventsCount, _maxListeners, cluster as default, unimplemented as disconnect, unimplemented as fork, isMaster, isWorker, schedulingPolicy, settings, unimplemented as setupMaster, workers };
