declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test";
        }
        interface Global {
            File: typeof File;
            Headers: typeof Headers;
            Request: typeof Request;
            Response: typeof Response;
            fetch: typeof fetch;
            FormData: typeof FormData;
            ReadableStream: typeof ReadableStream;
            WritableStream: typeof WritableStream;
        }
    }
    interface RequestInit {
        duplex?: "half";
    }
}
export declare function installGlobals({ nativeFetch, }?: {
    nativeFetch?: boolean;
}): void;
