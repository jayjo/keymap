import { posix } from './posix.js';

function unimplemented () {
  throw new Error('Node.js path/win32 module is not supported by JSPM core in the browser');
}

export {
  unimplemented as resolve,
  unimplemented as normalize,
  unimplemented as isAbsolute,
  unimplemented as join,
  unimplemented as relative,
  unimplemented as _makeLong,
  unimplemented as dirname,
  unimplemented as basename,
  unimplemented as extname,
  unimplemented as format,
  unimplemented as parse,
  unimplemented as sep,
  unimplemented as delimiter,
  posix
}

export const win32 = {
  resolve: unimplemented,
  normalize: unimplemented,
  isAbsolute: unimplemented,
  join: unimplemented,
  relative: unimplemented,
  _makeLong: unimplemented,
  dirname: unimplemented,
  basename: unimplemented,
  extname: unimplemented,
  format: unimplemented,
  parse: unimplemented,
  sep: unimplemented,
  delimiter: unimplemented,
  posix,
};
win32.win32 = win32;

export default win32;
