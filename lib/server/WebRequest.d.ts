/// <reference types="node" />
import * as HTTP from "http";
import { ViewParams } from "skydapp-common";
export default class WebRequest {
    req: HTTP.IncomingMessage;
    headers: HTTP.IncomingHttpHeaders;
    method: string;
    ip: string;
    parameterString: string;
    parameters: {
        [name: string]: string | undefined;
    };
    uri: string;
    responsed: boolean;
    constructor(req: HTTP.IncomingMessage);
    loadBody(): Promise<string>;
    route(pattern: string, handler: (viewParams: ViewParams) => Promise<void>): Promise<void>;
    toString: () => string;
}
//# sourceMappingURL=WebRequest.d.ts.map