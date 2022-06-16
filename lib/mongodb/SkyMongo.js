"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class SkyMongo {
    constructor() {
        this.dbs = {};
    }
    async connect(url, dbName, alias) {
        this.client = new mongodb_1.MongoClient(url);
        await this.client.connect();
        this.dbs[alias === undefined ? "" : alias] = this.client.db(dbName);
    }
    openSession() {
        if (this.client === undefined) {
            throw new Error("MongoDB Not Connected.");
        }
        return this.client.startSession();
    }
    async withTransaction(func) {
        const session = this.openSession();
        try {
            session.startTransaction();
            await func(session);
            await session.commitTransaction();
            await session.endSession();
        }
        catch (error) {
            await session.abortTransaction();
            await session.endSession();
            throw error;
        }
    }
    createCollection(collectionName, alias) {
        const db = this.dbs[alias === undefined ? "" : alias];
        if (db === undefined) {
            throw new Error("MongoDB Not Connected.");
        }
        return db.collection(collectionName);
    }
}
exports.default = new SkyMongo();
//# sourceMappingURL=SkyMongo.js.map