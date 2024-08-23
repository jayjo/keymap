import { y } from './chunk-4bd36a8f.js';
export { y as default } from './chunk-4bd36a8f.js';

// https://github.com/denoland/deno_std/blob/d005433c709054af87aca54f57a446b4f7966f11/node/events.ts#L501-L638
y.once = function (emitter, event) {
  return new Promise((resolve, reject) => {
    function eventListener(...args) {
      if (errorListener !== undefined) {
        emitter.removeListener('error', errorListener);
      }
      resolve(args);
    }
    let errorListener;
    if (event !== 'error') {
      // deno-lint-ignore no-explicit-any
      errorListener = (err) => {
        emitter.removeListener(name, eventListener);
        reject(err);
      };

      emitter.once('error', errorListener);
    }

    emitter.once(event, eventListener);
  });
};
y.on = function (emitter, event) {
  const unconsumedEventValues = [];
  const unconsumedPromises = [];
  let error = null;
  let finished = false;

  const iterator = {
    async next() {
      const value = unconsumedEventValues.shift();
      if (value) {
        return createIterResult(value, false);
      }

      if (error) {
        const p = Promise.reject(error);
        error = null;
        return p;
      }

      if (finished) {
        return createIterResult(undefined, true);
      }

      return new Promise((resolve, reject) => unconsumedPromises.push({ resolve, reject }));
    },
    async return() {
      emitter.removeListener(event, eventHandler);
      emitter.removeListener('error', errorHandler);
      finished = true;

      for (const promise of unconsumedPromises) {
        promise.resolve(createIterResult(undefined, true));
      }

      return createIterResult(undefined, true);
    },
    throw(err) {
      error = err;
      emitter.removeListener(event, eventHandler);
      emitter.removeListener('error', errorHandler);
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };

  emitter.on(event, eventHandler);
  emitter.on('error', errorHandler);

  return iterator;

  function eventHandler(...args) {
    const promise = unconsumedPromises.shift();
    if (promise) {
      promise.resolve(createIterResult(args, false));
    } else {
      unconsumedEventValues.push(args);
    }
  }

  function errorHandler(err) {
    finished = true;
    const toError = unconsumedPromises.shift();
    if (toError) {
      toError.reject(err);
    } else {
      error = err;
    }
    iterator.return();
  }
};
const {
  EventEmitter,
  defaultMaxListeners,
  init,
  listenerCount,
  on,
  once,
} = y;

export { EventEmitter, defaultMaxListeners, init, listenerCount, on, once };
