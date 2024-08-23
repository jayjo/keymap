function unimplemented () {
  throw new Error('Node.js async_hooks module is not supported by JSPM core outside of Node.js');
}

export default {
  AsyncLocalStorage: unimplemented,
  createHook: unimplemented,
  executionAsyncId: unimplemented,
  triggerAsyncId: unimplemented,
  executionAsyncResource: unimplemented,
  AsyncResource: unimplemented
};

export {
  unimplemented as AsyncLocalStorage,
  unimplemented as createHook,
  unimplemented as executionAsyncId,
  unimplemented as triggerAsyncId,
  unimplemented as executionAsyncResource,
  unimplemented as AsyncResource
}
