import formidable from "formidable";
import WebRequest from "../WebRequest";
import UploadFile from "./UploadFile";

export default async (req: WebRequest) => {
    return new Promise<UploadFile[]>((resolve, reject) => {
        const form = formidable({ multiples: true });
        form.parse(req.req, (error, fields, rawFiles) => {
            if (error !== null) {
                reject(error);
            } else {
                const files: UploadFile[] = [];
                for (const rawFile of Object.values<any>(rawFiles)) {
                    if (Array.isArray(rawFile) === true) {
                        for (const rf of rawFile) {
                            files.push({
                                path: rf.path,
                                size: rf.size,
                                name: rf.name,
                                type: rf.type,
                                modifiedTime: rf.lastModifiedDate?.getTime(),
                            });
                        }
                    } else {
                        files.push({
                            path: rawFile.path,
                            size: rawFile.size,
                            name: rawFile.name,
                            type: rawFile.type,
                            modifiedTime: rawFile.lastModifiedDate?.getTime(),
                        });
                    }
                }
                resolve(files);
            }
        });
    });
};
