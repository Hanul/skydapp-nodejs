import AbstractSocketClient from "./AbstractSocketClient";

export default class SocketClient extends AbstractSocketClient {

    public send(method: string, ...params: any[]): void {
        throw new Error("Method not implemented.");
    }
}
