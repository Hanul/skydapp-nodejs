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
const skydapp_common_1 = require("skydapp-common");
const ZLib = __importStar(require("zlib"));
const ENCODINGS_json_1 = __importDefault(require("../ENCODINGS.json"));
class WebResponse {
    constructor(webRequest, res) {
        this.webRequest = webRequest;
        this.res = res;
        this.responsed = false;
        const headers = webRequest.headers["accept-encoding"];
        if (typeof headers === "string") {
            this.acceptEncoding = headers;
        }
        else if (headers === undefined) {
            this.acceptEncoding = "";
        }
        else {
            this.acceptEncoding = headers[0];
        }
    }
    response({ headers = {}, statusCode, contentType, encoding, content, }) {
        if (this.responsed !== true) {
            if (contentType !== undefined) {
                if (encoding === undefined) {
                    encoding = ENCODINGS_json_1.default[contentType];
                }
                headers["Content-Type"] = `${contentType}; charset=${encoding}`;
            }
            if (content === undefined) {
                content = "";
            }
            if (statusCode === undefined) {
                statusCode = 200;
            }
            if (encoding === undefined) {
                encoding = "utf-8";
            }
            if (encoding === "utf-8" && typeof this.acceptEncoding === "string" && this.acceptEncoding.match(/\bgzip\b/) !== null) {
                headers["Content-Encoding"] = "gzip";
                ZLib.gzip(content, (error, buffer) => {
                    if (error !== null) {
                        skydapp_common_1.SkyLog.error(error, this.webRequest);
                    }
                    else {
                        this.res.writeHead(statusCode, headers);
                        this.res.end(buffer, encoding);
                    }
                });
            }
            else {
                this.res.writeHead(statusCode, headers);
                this.res.end(content, encoding);
            }
            this.responsed = true;
            this.webRequest.responsed = true;
        }
    }
}
exports.default = WebResponse;
//# sourceMappingURL=WebResponse.js.map