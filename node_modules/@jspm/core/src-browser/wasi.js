import { WASI as _WASI } from '@wasmer/wasi/lib/index.esm.js';
import fs from './fs.js';

export class WASI extends _WASI {
  constructor(options) {
    super(Object.assign({}, options, {
      bindings: Object.assign({}, _WASI.defaultBindings, {
        isTTY: () => false,
        fs,
      }),
    }));
  }
}

export default { WASI };
