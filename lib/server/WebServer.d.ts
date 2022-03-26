/// <reference types="node" />
import * as HTTPS from "https";
import { EventContainer } from "skydapp-common";
import WebRequest from "./WebRequest";
import WebResponse from "./WebResponse";
export interface WebServerOptions {
    port: number;
    httpPort?: number;
    key: string;
    cert: string;
    indexFilePath?: string;
}
export default class WebServer extends EventContainer {
    private options;
    private handler;
    private notFoundHandler?;
    static contentTypeFromPath(path: string): string;
    static encodingFromContentType(contentType: string): BufferEncoding;
    httpsServer: HTTPS.Server | undefined;
    constructor(options: WebServerOptions, handler: (webRequest: WebRequest, webResponse: WebResponse) => Promise<void>, notFoundHandler?: ((webRequest: WebRequest, webResponse: WebResponse) => void) | undefined);
    private responseStream;
    private responseResource;
    private load;
}
//# sourceMappingURL=WebServer.d.ts.map