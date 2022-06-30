"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractSocketClient_1 = __importDefault(require("./AbstractSocketClient"));
class WebSocketClient extends AbstractSocketClient_1.default {
    constructor(server, webSocket, nativeRequest) {
        super();
        this.server = server;
        this.webSocket = webSocket;
        this.disconnected = false;
        const headerIp = nativeRequest.headers["x-forwarded-for"];
        if (headerIp !== undefined) {
            if (typeof headerIp === "string") {
                this.ip = headerIp;
            }
            else if (headerIp[0] !== undefined) {
                this.ip = headerIp[0];
            }
            else if (nativeRequest.socket.remoteAddress !== undefined) {
                this.ip = nativeRequest.socket.remoteAddress;
            }
            else {
                this.ip = "";
            }
        }
        else if (nativeRequest.socket.remoteAddress !== undefined) {
            this.ip = nativeRequest.socket.remoteAddress;
        }
        else {
            this.ip = "";
        }
        if (this.ip.substring(0, 7) === "::ffff:") {
            this.ip = this.ip.substring(7);
        }
        webSocket.on("message", async (json) => {
            const data = JSON.parse(json);
            try {
                const results = await this.fireEvent(data.method, ...data.params);
                if (data.__send_key !== undefined) {
                    if (results.length === 0) {
                        console.error("메소드를 찾을 수 없음", data);
                        this.send(`__error_${data.__send_key}`, "메소드를 찾을 수 없음");
                    }
                    else {
                        for (const result of results) {
                            this.send(`__callback_${data.__send_key}`, result);
                        }
                    }
                }
            }
            catch (error) {
                if (data.__send_key !== undefined) {
                    this.send(`__error_${data.__send_key}`, error.toString());
                }
            }
        });
        webSocket.on("close", () => {
            this.disconnected = true;
            this.fireEvent("disconnect");
        });
    }
    send(method, ...params) {
        this.webSocket.send(JSON.stringify({ method, params }));
    }
    broadcast(method, ...params) {
        for (const client of this.server.clients) {
            if (client !== this) {
                client.send(method, ...params);
            }
        }
    }
}
exports.default = WebSocketClient;
//# sourceMappingURL=WebSocketClient.js.map