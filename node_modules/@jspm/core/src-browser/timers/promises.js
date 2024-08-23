import { promisify } from '../util.js';
import timers from '../timers.js';

export const setTimeout = promisify(timers.setTimeout),
  setImmediate = promisify(timers.setImmediate),
  setInterval = promisify(timers.setInterval);

export default {
  setTimeout,
  setImmediate,
  setInterval
};
