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
const FS = __importStar(require("fs"));
const Path = __importStar(require("path"));
class SkyFiles {
    async checkFileExists(path) {
        if (path === "./") {
            return true;
        }
        else {
            return new Promise((resolve) => {
                FS.access(path, (error) => {
                    if (error !== null) {
                        resolve(false);
                    }
                    else {
                        FS.readdir(Path.dirname(path), (error2, names) => {
                            if (error2 !== null) {
                                resolve(false);
                            }
                            else {
                                resolve(names.includes(Path.basename(path)));
                            }
                        });
                    }
                });
            });
        }
    }
    async readBuffer(path) {
        if (await this.checkFileExists(path) !== true) {
            throw new Error(`${path} Not Exists`);
        }
        else {
            return new Promise((resolve, reject) => {
                FS.stat(path, (error, stat) => {
                    if (error !== null) {
                        reject(error);
                    }
                    else if (stat.isDirectory() === true) {
                        reject(new Error(`${path} Is Folder`));
                    }
                    else {
                        FS.readFile(path, (error2, buffer) => {
                            if (error2 !== null) {
                                reject(error2);
                            }
                            else {
                                resolve(buffer);
                            }
                        });
                    }
                });
            });
        }
    }
    async readText(path) {
        return (await this.readBuffer(path)).toString();
    }
    async getFileInfo(path) {
        if (await this.checkFileExists(path) !== true) {
            throw new Error(`${path} Not Exists`);
        }
        else {
            return new Promise((resolve, reject) => {
                FS.stat(path, (error, stat) => {
                    if (error !== null) {
                        reject(error);
                    }
                    else {
                        resolve({
                            size: stat.isDirectory() === true ? 0 : stat.size,
                            createTime: stat.birthtime,
                            lastUpdateTime: stat.mtime,
                        });
                    }
                });
            });
        }
    }
    async deleteFile(path) {
        if (await this.checkFileExists(path) === true) {
            return new Promise((resolve, reject) => {
                FS.unlink(path, (error) => {
                    if (error !== null) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                });
            });
        }
    }
    async createFolder(path) {
        if (await this.checkFileExists(path) !== true) {
            const folderPath = Path.dirname(path);
            if (folderPath !== path && folderPath + "/" !== path) {
                if (folderPath === "." || await this.checkFileExists(folderPath) === true) {
                    return new Promise((resolve, reject) => {
                        FS.mkdir(path, (error) => {
                            if (error !== null) {
                                reject(error);
                            }
                            else {
                                resolve();
                            }
                        });
                    });
                }
                else {
                    await this.createFolder(folderPath);
                    return this.createFolder(path);
                }
            }
        }
    }
    async write(path, content) {
        await this.createFolder(Path.dirname(path));
        return new Promise((resolve, reject) => {
            FS.writeFile(path, content, (error) => {
                if (error !== null) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.default = new SkyFiles();
//# sourceMappingURL=SkyFiles.js.map