/// <reference types="node" />
declare class SkyFiles {
    checkFileExists(path: string): Promise<boolean>;
    readBuffer(path: string): Promise<Buffer>;
    readText(path: string): Promise<string>;
    getFileInfo(path: string): Promise<{
        size: number;
        createTime: Date;
        lastUpdateTime: Date;
    }>;
    deleteFile(path: string): Promise<void>;
    createFolder(path: string): Promise<void>;
    write(path: string, content: Buffer | string): Promise<void>;
}
declare const _default: SkyFiles;
export default _default;
//# sourceMappingURL=SkyFiles.d.ts.map