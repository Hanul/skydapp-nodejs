import { ClientSession, Db, MongoClient } from "mongodb";

class SkyMongo {

    private client: MongoClient | undefined;
    private dbs: { [name: string]: Db } = {};

    public async connect(url: string, dbName: string, alias?: string) {
        this.client = new MongoClient(url);
        await this.client.connect();
        this.dbs[alias === undefined ? "" : alias] = this.client.db(dbName);
    }

    public openSession() {
        if (this.client === undefined) {
            throw new Error("MongoDB Not Connected.");
        }
        return this.client.startSession();
    }

    public async withTransaction(func: (session: ClientSession) => Promise<void>) {
        const session = this.openSession();
        try {
            session.startTransaction();
            await func(session);
            await session.commitTransaction();
            await session.endSession();
        } catch (error) {
            console.error(error);
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }

    public createCollection(collectionName: string, alias?: string) {
        const db = this.dbs[alias === undefined ? "" : alias];
        if (db === undefined) {
            throw new Error("MongoDB Not Connected.");
        }
        return db.collection(collectionName);
    }
}

export default new SkyMongo();
