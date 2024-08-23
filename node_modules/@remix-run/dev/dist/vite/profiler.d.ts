/// <reference types="node" />
import type { Session } from "node:inspector";
export declare const getSession: () => Session | undefined;
export declare const start: (callback?: () => void | Promise<void>) => Promise<void>;
export declare const stop: (log: (message: string) => void) => void | Promise<void>;
