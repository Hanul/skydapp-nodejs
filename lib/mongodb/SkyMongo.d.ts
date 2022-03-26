declare class SkyMongo {
    private client;
    private db;
    connect(url: string, dbName: string): Promise<void>;
    createCollection(collectionName: string): import("mongodb").Collection<import("bson").Document>;
}
declare const _default: SkyMongo;
export default _default;
//# sourceMappingURL=SkyMongo.d.ts.map