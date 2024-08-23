function unimplemented () {
  throw new Error('Node.js async_hooks module is not supported by JSPM core outside of Node.js');
}

var async_hooks = {
  AsyncLocalStorage: unimplemented,
  createHook: unimplemented,
  executionAsyncId: unimplemented,
  triggerAsyncId: unimplemented,
  executionAsyncResource: unimplemented,
  AsyncResource: unimplemented
};

export { unimplemented as AsyncLocalStorage, unimplemented as AsyncResource, unimplemented as createHook, async_hooks as default, unimplemented as executionAsyncId, unimplemented as executionAsyncResource, unimplemented as triggerAsyncId };
