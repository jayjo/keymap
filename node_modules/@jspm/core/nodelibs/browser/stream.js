import { e as exports } from './chunk-6c718bbe.js';
export { e as default } from './chunk-6c718bbe.js';
import { promisify } from './util.js';
import './events.js';
import './chunk-4bd36a8f.js';
import './chunk-44e51b61.js';
import './chunk-ce0fbc82.js';
import './chunk-b4205b57.js';
import './chunk-5decc758.js';
import './chunk-2eac56ff.js';
import './chunk-4ccc3a29.js';

var Readable = exports.Readable;
Readable.wrap = function(src, options) {
  options = Object.assign({ objectMode: src.readableObjectMode != null || src.objectMode != null || true }, options);
  options.destroy = function(err, callback) {
    src.destroy(err);
    callback(err);
  };
  return new Readable(options).wrap(src);
};

var Writable = exports.Writable;
var Duplex = exports.Duplex;
var Transform = exports.Transform;
var PassThrough = exports.PassThrough;
var finished = exports.finished;
var pipeline = exports.pipeline;
var Stream = exports.Stream;

const promises = {
  finished: promisify(exports.finished),
  pipeline: promisify(exports.pipeline)
};

export { Duplex, PassThrough, Readable, Stream, Transform, Writable, finished, pipeline, promises };
