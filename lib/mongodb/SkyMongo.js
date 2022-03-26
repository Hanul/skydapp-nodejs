"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class SkyMongo {
    async connect(url, dbName) {
        this.client = new mongodb_1.MongoClient(url);
        await this.client.connect();
        this.db = this.client.db(dbName);
    }
    createCollection(collectionName) {
        if (this.db === undefined) {
            throw new Error("MongoDB Not Connected.");
        }
        return this.db.collection(collectionName);
    }
}
exports.default = new SkyMongo();
//# sourceMappingURL=SkyMongo.js.map