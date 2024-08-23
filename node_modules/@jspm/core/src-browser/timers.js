import timers from 'timers-browserify';
export default timers;

export var _unrefActive = timers._unrefActive;
export var active = timers.active;
export var clearImmediate = timers.clearImmediate;
export var clearInterval = timers.clearInterval;
export var clearTimeout = timers.clearTimeout;
export var enroll = timers.enroll;
export var setImmediate = timers.setImmediate;
export var setInterval = timers.setInterval;
export var setTimeout = timers.setTimeout;
export var unenroll = timers.unenroll;
