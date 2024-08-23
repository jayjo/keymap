import { readFile } from '../nodelibs/browser/fs/promises.js';
import { WASI } from '../nodelibs/browser/wasi.js';

const wasi = new WASI({
  args: ['cowsay', 'moo']
});

const importObject = { wasi_unstable: wasi.wasiImport };

const wasm = await WebAssembly.compile(await readFile(new URL('./cowsay.wasm', import.meta.url)));
const instance = await WebAssembly.instantiate(wasm, importObject);

wasi.start(instance);
