import WebServer from "./WebServer";
import WebSocketClient from "./WebSocketClient";
export default class WebSocketServer {
    private webServer;
    private handler;
    clients: WebSocketClient[];
    constructor(webServer: WebServer, handler: (client: WebSocketClient) => void);
    private launch;
    broadcast(method: string, ...params: any[]): void;
}
//# sourceMappingURL=WebSocketServer.d.ts.map