function unimplemented () {
  throw new Error('Node.js dns is not supported by JSPM core outside of Node.js');
}

export {
  unimplemented as lookup,
  unimplemented as lookupService,
  unimplemented as Resolver,
  unimplemented as getServers,
  unimplemented as resolve,
  unimplemented as resolve4,
  unimplemented as resolve6,
  unimplemented as resolveAny,
  unimplemented as resolveCname,
  unimplemented as resolveMx,
  unimplemented as resolveNaptr,
  unimplemented as resolveNs,
  unimplemented as resolvePtr,
  unimplemented as resolveSoa,
  unimplemented as resolveSrv,
  unimplemented as resolveTxt,
  unimplemented as reverse,
  unimplemented as setServers
};

export default {
  lookup: unimplemented,
  lookupService: unimplemented,
  Resolver: unimplemented,
  getServers: unimplemented,
  resolve: unimplemented,
  resolve4: unimplemented,
  resolve6: unimplemented,
  resolveAny: unimplemented,
  resolveCname: unimplemented,
  resolveMx: unimplemented,
  resolveNaptr: unimplemented,
  resolveNs: unimplemented,
  resolvePtr: unimplemented,
  resolveSoa: unimplemented,
  resolveSrv: unimplemented,
  resolveTxt: unimplemented,
  reverse: unimplemented,
  setServers: unimplemented
};
