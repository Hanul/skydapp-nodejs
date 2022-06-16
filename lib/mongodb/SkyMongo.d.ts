import { ClientSession } from "mongodb";
declare class SkyMongo {
    private client;
    private dbs;
    connect(url: string, dbName: string, alias?: string): Promise<void>;
    openSession(): ClientSession;
    withTransaction(func: (session: ClientSession) => Promise<void>): Promise<void>;
    createCollection(collectionName: string, alias?: string): import("mongodb").Collection<import("bson").Document>;
}
declare const _default: SkyMongo;
export default _default;
//# sourceMappingURL=SkyMongo.d.ts.map