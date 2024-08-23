import stream from 'stream-browserify';
import { promisify } from './util.js';
export default stream;

export var Readable = stream.Readable;
Readable.wrap = function(src, options) {
  options = Object.assign({ objectMode: src.readableObjectMode != null || src.objectMode != null || true }, options);
  options.destroy = function(err, callback) {
    src.destroy(err);
    callback(err);
  };
  return new Readable(options).wrap(src);
};

export var Writable = stream.Writable;
export var Duplex = stream.Duplex;
export var Transform = stream.Transform;
export var PassThrough = stream.PassThrough;
export var finished = stream.finished;
export var pipeline = stream.pipeline;
export var Stream = stream.Stream;

export const promises = {
  finished: promisify(stream.finished),
  pipeline: promisify(stream.pipeline)
};
