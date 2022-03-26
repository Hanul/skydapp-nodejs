import AbstractSocketClient from "./AbstractSocketClient";
import WebRequest from "./WebRequest";
import WebResponse from "./WebResponse";
import WebServer from "./WebServer";

export interface SkyServerOptions {
    socketPort?: number;

    webPort?: number;
    httpPort?: number;
    key?: string | Buffer;
    cert?: string | Buffer;
}

export default class SkyServer {

    private webServer: WebServer | undefined;

    constructor(
        options: SkyServerOptions,
        socketHandler: (client: AbstractSocketClient) => void,
        webHandler?: (webRequest: WebRequest, webResponse: WebResponse) => void,
    ) {

    }

    public delete() {

    }
}
