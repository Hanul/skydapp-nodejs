"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formidable_1 = __importDefault(require("formidable"));
exports.default = async (req) => {
    return new Promise((resolve, reject) => {
        const form = (0, formidable_1.default)({ multiples: true });
        form.parse(req.req, (error, fields, rawFiles) => {
            var _a, _b;
            if (error !== null) {
                reject(error);
            }
            else {
                const files = [];
                for (const rawFile of Object.values(rawFiles)) {
                    if (Array.isArray(rawFile) === true) {
                        for (const rf of rawFile) {
                            files.push({
                                path: rf.path,
                                size: rf.size,
                                name: rf.name,
                                type: rf.type,
                                modifiedTime: (_a = rf.lastModifiedDate) === null || _a === void 0 ? void 0 : _a.getTime(),
                            });
                        }
                    }
                    else {
                        files.push({
                            path: rawFile.path,
                            size: rawFile.size,
                            name: rawFile.name,
                            type: rawFile.type,
                            modifiedTime: (_b = rawFile.lastModifiedDate) === null || _b === void 0 ? void 0 : _b.getTime(),
                        });
                    }
                }
                resolve(files);
            }
        });
    });
};
//# sourceMappingURL=parseUpload.js.map