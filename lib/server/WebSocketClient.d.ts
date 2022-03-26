/// <reference types="node" />
import HTTP from "http";
import * as WebSocket from "ws";
import AbstractSocketClient from "./AbstractSocketClient";
import WebSocketServer from "./WebSocketServer";
export default class WebSocketClient extends AbstractSocketClient {
    private server;
    private webSocket;
    ip: string;
    disconnected: boolean;
    constructor(server: WebSocketServer, webSocket: WebSocket, nativeRequest: HTTP.IncomingMessage);
    send(method: string, ...params: any[]): void;
    broadcast(method: string, ...params: any[]): void;
}
//# sourceMappingURL=WebSocketClient.d.ts.map