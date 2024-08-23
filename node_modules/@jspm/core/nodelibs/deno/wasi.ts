import Context, { ContextOptions } from 'https://deno.land/std@0.173.0/wasi/snapshot_preview1.ts';

export interface WASIOptions extends Omit<ContextOptions, 'exitOnReturn'> {
  returnOnExit?: boolean;
}

export class WASI extends Context {
  readonly wasiImport: Context['exports'];

  constructor(options?: WASIOptions) {
    super(options && { ...options, exitOnReturn: options.returnOnExit });
    this.wasiImport = this.exports;
  }
}

export default { WASI };
