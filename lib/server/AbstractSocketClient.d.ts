import { EventContainer } from "skydapp-common";
export default abstract class AbstractSocketClient extends EventContainer {
    abstract send(method: string, ...params: any[]): void;
}
//# sourceMappingURL=AbstractSocketClient.d.ts.map