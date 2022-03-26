"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractSocketClient_1 = __importDefault(require("./AbstractSocketClient"));
class SocketClient extends AbstractSocketClient_1.default {
    send(method, ...params) {
        throw new Error("Method not implemented.");
    }
}
exports.default = SocketClient;
//# sourceMappingURL=SocketClient.js.map