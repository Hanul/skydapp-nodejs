import * as HTTP from "http";
import * as HTTPS from "https";
import * as Path from "path";
import { EventContainer, SkyLog } from "skydapp-common";
import CONTENT_TYPES from "../CONTENT_TYPES.json";
import ENCODINGS from "../ENCODINGS.json";
import SkyFiles from "../SkyFiles";
import WebRequest from "./WebRequest";
import WebResponse from "./WebResponse";

export interface WebServerOptions {
    port: number;
    httpPort?: number;
    key: string;
    cert: string;
    indexFilePath?: string;
}

export default class WebServer extends EventContainer {

    public static contentTypeFromPath(path: string): string {
        const extension = Path.extname(path).substring(1);
        const contentType = (CONTENT_TYPES as any)[extension];
        return contentType === undefined ? "application/octet-stream" : contentType;
    }

    public static encodingFromContentType(contentType: string): BufferEncoding {
        const encoding = (ENCODINGS as any)[contentType];
        return encoding === undefined ? "binary" : encoding;
    }

    public httpsServer: HTTPS.Server | undefined;

    constructor(
        private options: WebServerOptions,
        private handler: (webRequest: WebRequest, webResponse: WebResponse) => Promise<void>,
        private notFoundHandler?: (webRequest: WebRequest, webResponse: WebResponse) => void,
    ) {
        super();
        this.load();
    }

    private responseStream(webRequest: WebRequest, webResponse: WebResponse) {
        //TODO:
    }

    private async responseResource(webRequest: WebRequest, webResponse: WebResponse) {
        if (webRequest.uri.includes("..") === true) {
            webResponse.response({ statusCode: 500, content: "Stop Attack" });
        } else {
            if (webRequest.headers.range !== undefined) {
                this.responseStream(webRequest, webResponse);
            } else if (webRequest.method === "GET") {
                try {
                    const contentType = WebServer.contentTypeFromPath(webRequest.uri);
                    const content = await SkyFiles.readBuffer(`${process.cwd()}/public/${webRequest.uri}`);
                    webResponse.response({ content, contentType });
                } catch (error) {
                    try {
                        const indexFileContent = await SkyFiles.readBuffer(`${process.cwd()}/public/${this.options.indexFilePath === undefined ? "index.html" : this.options.indexFilePath}`);
                        webResponse.response({ content: indexFileContent, contentType: "text/html" });
                    } catch (error) {
                        webResponse.response({ statusCode: 404 });
                    }
                }
            }
        }
    }

    private async load() {

        const key = await SkyFiles.readBuffer(this.options.key);
        const cert = await SkyFiles.readBuffer(this.options.cert);

        this.httpsServer = HTTPS.createServer({ key, cert }, async (req: HTTP.IncomingMessage, res: HTTP.ServerResponse) => {

            const webRequest = new WebRequest(req);
            const webResponse = new WebResponse(webRequest, res);

            if (webRequest.method === "OPTIONS") {
                webResponse.response({
                    headers: {
                        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
                        "Access-Control-Allow-Origin": "*",
                    },
                });
            }

            else {
                await this.handler(webRequest, webResponse);
                if (webResponse.responsed !== true) {
                    await this.responseResource(webRequest, webResponse);
                    if (this.notFoundHandler !== undefined && (webResponse.responsed as any) !== true) {
                        this.notFoundHandler(webRequest, webResponse);
                    }
                }
            }

        }).listen(this.options.port);

        this.httpsServer.on("error", (error) => {
            SkyLog.error(error, this.options);
        });

        if (this.options.httpPort !== undefined) {
            // http -> https redirect
            HTTP.createServer((req, res) => {
                res.writeHead(302, {
                    Location: `https://${req.headers.host}${this.options.port === 443 ? "" : `:${this.options.port}`}${req.url}`,
                });
                res.end();
            }).listen(this.options.httpPort);
        }

        SkyLog.success(`web server running... https://localhost:${this.options.port}`);

        this.fireEvent("load");
    }
}
