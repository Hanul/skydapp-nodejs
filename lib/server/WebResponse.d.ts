/// <reference types="node" />
import * as HTTP from "http";
import WebRequest from "./WebRequest";
export default class WebResponse {
    private webRequest;
    private res;
    private acceptEncoding;
    responsed: boolean;
    constructor(webRequest: WebRequest, res: HTTP.ServerResponse);
    response({ headers, statusCode, contentType, encoding, content, }: {
        headers?: {
            [headerName: string]: any;
        };
        statusCode?: number;
        contentType?: string;
        encoding?: BufferEncoding;
        content?: string | Buffer;
    }): void;
    response404(): void;
    apiResponse(info?: any): void;
    apiResponseError(errorMessage?: string): void;
}
//# sourceMappingURL=WebResponse.d.ts.map