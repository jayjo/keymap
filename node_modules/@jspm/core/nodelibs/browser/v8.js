// Using null for Babel
// (https://unpkg.com/browse/@babel/core@7.14.8/lib/transformation/util/clone-deep.js)

const unimplemented = null;

var v8 = {
  cacheDataVersionTag: unimplemented,
  getHeapSnapshot: unimplemented,
  getHeapStatistics: unimplemented,
  getHeapSpaceStatistics: unimplemented,
  setFlagsFromString: unimplemented,
  Serializer: unimplemented,
  Deserializer: unimplemented,
  DefaultSerializer: unimplemented,
  DefaultDeserializer: unimplemented,
  deserialize: unimplemented,
  serialize: unimplemented,
  writeHeapSnapshot: unimplemented
};

export { unimplemented as DefaultDeserializer, unimplemented as DefaultSerializer, unimplemented as Deserializer, unimplemented as Serializer, unimplemented as cacheDataVersionTag, v8 as default, unimplemented as deserialize, unimplemented as getHeapSnapshot, unimplemented as getHeapSpaceStatistics, unimplemented as getHeapStatistics, unimplemented as serialize, unimplemented as setFlagsFromString, unimplemented as writeHeapSnapshot };
