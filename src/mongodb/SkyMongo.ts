import { Db, MongoClient } from "mongodb";

class SkyMongo {

    private client: MongoClient | undefined;
    private db: Db | undefined;

    public async connect(url: string, dbName: string) {
        this.client = new MongoClient(url);
        await this.client.connect();
        this.db = this.client.db(dbName);
    }

    public createCollection(collectionName: string) {
        if (this.db === undefined) {
            throw new Error("MongoDB Not Connected.");
        }
        return this.db.collection(collectionName);
    }
}

export default new SkyMongo();
