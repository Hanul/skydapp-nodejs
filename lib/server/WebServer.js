"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP = __importStar(require("http"));
const HTTPS = __importStar(require("https"));
const Path = __importStar(require("path"));
const skydapp_common_1 = require("skydapp-common");
const CONTENT_TYPES_json_1 = __importDefault(require("../CONTENT_TYPES.json"));
const ENCODINGS_json_1 = __importDefault(require("../ENCODINGS.json"));
const SkyFiles_1 = __importDefault(require("../SkyFiles"));
const WebRequest_1 = __importDefault(require("./WebRequest"));
const WebResponse_1 = __importDefault(require("./WebResponse"));
class WebServer extends skydapp_common_1.EventContainer {
    constructor(options, handler, notFoundHandler) {
        super();
        this.options = options;
        this.handler = handler;
        this.notFoundHandler = notFoundHandler;
        this.load();
    }
    static contentTypeFromPath(path) {
        const extension = Path.extname(path).substring(1);
        const contentType = CONTENT_TYPES_json_1.default[extension];
        return contentType === undefined ? "application/octet-stream" : contentType;
    }
    static encodingFromContentType(contentType) {
        const encoding = ENCODINGS_json_1.default[contentType];
        return encoding === undefined ? "binary" : encoding;
    }
    responseStream(webRequest, webResponse) {
    }
    async responseResource(webRequest, webResponse) {
        if (webRequest.headers.range !== undefined) {
            this.responseStream(webRequest, webResponse);
        }
        else if (webRequest.method === "GET") {
            try {
                const contentType = WebServer.contentTypeFromPath(webRequest.uri);
                const content = await SkyFiles_1.default.readBuffer(`${process.cwd()}/public/${webRequest.uri}`);
                webResponse.response({ content, contentType });
            }
            catch (error) {
                try {
                    const indexFileContent = await SkyFiles_1.default.readBuffer(`${process.cwd()}/public/${this.options.indexFilePath === undefined ? "index.html" : this.options.indexFilePath}`);
                    webResponse.response({ content: indexFileContent, contentType: "text/html" });
                }
                catch (error) {
                    webResponse.response({ statusCode: 404 });
                }
            }
        }
    }
    async load() {
        const key = await SkyFiles_1.default.readBuffer(this.options.key);
        const cert = await SkyFiles_1.default.readBuffer(this.options.cert);
        this.httpsServer = HTTPS.createServer({ key, cert }, async (req, res) => {
            const webRequest = new WebRequest_1.default(req);
            const webResponse = new WebResponse_1.default(webRequest, res);
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
                    if (this.notFoundHandler !== undefined && webResponse.responsed !== true) {
                        this.notFoundHandler(webRequest, webResponse);
                    }
                }
            }
        }).listen(this.options.port);
        this.httpsServer.on("error", (error) => {
            skydapp_common_1.SkyLog.error(error, this.options);
        });
        setInterval(async () => {
            var _a;
            const key = await SkyFiles_1.default.readBuffer(this.options.key);
            const cert = await SkyFiles_1.default.readBuffer(this.options.cert);
            (_a = this.httpsServer) === null || _a === void 0 ? void 0 : _a.setSecureContext({ key, cert });
        }, 86400000);
        if (this.options.httpPort !== undefined) {
            HTTP.createServer((req, res) => {
                res.writeHead(302, {
                    Location: `https://${req.headers.host}${this.options.port === 443 ? "" : `:${this.options.port}`}${req.url}`,
                });
                res.end();
            }).listen(this.options.httpPort);
        }
        skydapp_common_1.SkyLog.success(`web server running... https://localhost:${this.options.port}`);
        this.fireEvent("load");
    }
}
exports.default = WebServer;
//# sourceMappingURL=WebServer.js.map