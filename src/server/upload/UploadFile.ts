export default interface UploadFile {
    path: string,
    size: number,
    name: string,
    type?: string,
    modifiedTime?: number,
}