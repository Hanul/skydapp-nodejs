/// <reference types="node" />
import AbstractSocketClient from "./AbstractSocketClient";
import WebRequest from "./WebRequest";
import WebResponse from "./WebResponse";
export interface SkyServerOptions {
    socketPort?: number;
    webPort?: number;
    httpPort?: number;
    key?: string | Buffer;
    cert?: string | Buffer;
}
export default class SkyServer {
    private webServer;
    constructor(options: SkyServerOptions, socketHandler: (client: AbstractSocketClient) => void, webHandler?: (webRequest: WebRequest, webResponse: WebResponse) => void);
    delete(): void;
}
//# sourceMappingURL=SkyServer.d.ts.map