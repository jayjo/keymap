/// <reference types="node" />
import type { ServerResponse } from "node:http";
import type * as Vite from "vite";
export type NodeRequestHandler = (req: Vite.Connect.IncomingMessage, res: ServerResponse) => Promise<void>;
export declare function fromNodeRequest(nodeReq: Vite.Connect.IncomingMessage): Request;
export declare function toNodeRequest(res: Response, nodeRes: ServerResponse): Promise<void>;
