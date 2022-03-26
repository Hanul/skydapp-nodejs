import HTTP from "http";
import * as WebSocket from "ws";
import AbstractSocketClient from "./AbstractSocketClient";
import WebSocketServer from "./WebSocketServer";

export default class WebSocketClient extends AbstractSocketClient {

    public ip: string;
    public disconnected: boolean = false;

    constructor(
        private server: WebSocketServer,
        private webSocket: WebSocket,
        nativeRequest: HTTP.IncomingMessage,
    ) {
        super();

        // find ip
        const headerIp = nativeRequest.headers["x-forwarded-for"];
        if (headerIp !== undefined) {
            if (typeof headerIp === "string") {
                this.ip = headerIp;
            } else if (headerIp[0] !== undefined) {
                this.ip = headerIp[0];
            } else if (nativeRequest.socket.remoteAddress !== undefined) {
                this.ip = nativeRequest.socket.remoteAddress;
            } else {
                this.ip = "";
            }
        } else if (nativeRequest.socket.remoteAddress !== undefined) {
            this.ip = nativeRequest.socket.remoteAddress;
        } else {
            this.ip = "";
        }

        // IPv6 to IPv4
        if (this.ip.substring(0, 7) === "::ffff:") {
            this.ip = this.ip.substring(7);
        }

        webSocket.on("message", async (json: string) => {
            const data = JSON.parse(json);
            const results = await this.fireEvent(data.method, ...data.params);
            if (data.__send_key !== undefined) {
                for (const result of results) {
                    this.send(`__callback_${data.__send_key}`, result);
                }
            }
        });

        webSocket.on("close", () => {
            this.disconnected = true;
            this.fireEvent("disconnect");
        });
    }

    public send(method: string, ...params: any[]): void {
        this.webSocket.send(JSON.stringify({ method, params }));
    }

    public broadcast(method: string, ...params: any[]) {
        for (const client of this.server.clients) {
            if (client !== this) {
                client.send(method, ...params);
            }
        }
    }
}
