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
Object.defineProperty(exports, "__esModule", { value: true });
const Querystring = __importStar(require("querystring"));
const skydapp_common_1 = require("skydapp-common");
class WebRequest {
    constructor(req) {
        this.req = req;
        this.parameters = {};
        this.responsed = false;
        this.toString = () => {
            return JSON.stringify({
                headers: this.headers,
                method: this.method,
                ip: this.ip,
                parameterString: this.parameterString,
                parameters: this.parameters,
                uri: this.uri,
            });
        };
        this.headers = req.headers;
        this.method = req.method.toUpperCase();
        let ip;
        const headerIps = this.headers["x-forwarded-for"];
        if (headerIps !== undefined) {
            if (typeof headerIps === "string") {
                ip = headerIps;
            }
            else {
                ip = headerIps[0];
            }
        }
        if (ip === undefined) {
            ip = req.socket.remoteAddress;
            if (ip === undefined) {
                ip = "";
            }
        }
        if (ip.substring(0, 7) === "::ffff:") {
            ip = ip.substring(7);
        }
        this.ip = ip;
        this.uri = req.url;
        if (this.uri.indexOf("?") !== -1) {
            this.parameterString = this.uri.substring(this.uri.indexOf("?") + 1);
            this.uri = this.uri.substring(0, this.uri.indexOf("?"));
        }
        else {
            this.parameterString = "";
        }
        const queryParams = Querystring.parse(this.parameterString);
        for (const [name, param] of Object.entries(queryParams)) {
            if (Array.isArray(param) === true) {
                this.parameters[name] = queryParams[param.length - 1];
            }
            else {
                this.parameters[name] = queryParams[name];
            }
        }
        this.uri = this.uri.substring(1);
    }
    async loadBody() {
        const buffers = [];
        for await (const chunk of this.req) {
            buffers.push(chunk);
        }
        return Buffer.concat(buffers).toString();
    }
    async route(pattern, handler) {
        const viewParams = {};
        if (this.responsed !== true && skydapp_common_1.URIParser.parse(this.uri, pattern, viewParams) === true) {
            await handler(viewParams);
        }
    }
}
exports.default = WebRequest;
//# sourceMappingURL=WebRequest.js.map