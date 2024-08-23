const ByteLengthQueuingStrategy = globalThis.ByteLengthQueuingStrategy;
const CountQueuingStrategy = globalThis.CountQueuingStrategy;
const ReadableByteStreamController = globalThis.ReadableByteStreamController;
const ReadableStreamBYOBReader = globalThis.ReadableStreamBYOBReader;
const ReadableStreamBYOBRequest = globalThis.ReadableStreamBYOBRequest;
const ReadableStream = globalThis.ReadableStream;
const ReadableStreamDefaultController = globalThis.ReadableStreamDefaultController;
const ReadableStreamDefaultReader = globalThis.ReadableStreamDefaultReader;
const TextDecoderStream = globalThis.TextDecoderStream;
const TextEncoderStream = globalThis.TextEncoderStream;
const TransformStream = globalThis.TransformStream;
const TransformStreamDefaultController = globalThis.TransformStreamDefaultController;
const WritableStream = globalThis.WritableStream;
const WritableStreamDefaultController = globalThis.WritableStreamDefaultController;
const WritableStreamDefaultWriter = globalThis.WritableStreamDefaultWriter;

var web = {
  ReadableStream,
  ReadableStreamDefaultReader,
  ReadableStreamBYOBReader,
  ReadableStreamBYOBRequest,
  ReadableByteStreamController,
  ReadableStreamDefaultController,
  TransformStream,
  TransformStreamDefaultController,
  WritableStream,
  WritableStreamDefaultWriter,
  WritableStreamDefaultController,
  ByteLengthQueuingStrategy,
  CountQueuingStrategy,
  TextEncoderStream,
  TextDecoderStream,
};

export { ByteLengthQueuingStrategy, CountQueuingStrategy, ReadableByteStreamController, ReadableStream, ReadableStreamBYOBReader, ReadableStreamBYOBRequest, ReadableStreamDefaultController, ReadableStreamDefaultReader, TextDecoderStream, TextEncoderStream, TransformStream, TransformStreamDefaultController, WritableStream, WritableStreamDefaultController, WritableStreamDefaultWriter, web as default };
