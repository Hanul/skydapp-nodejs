"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const SkyMongo_1 = __importDefault(require("./SkyMongo"));
class DataStore {
    constructor(name) {
        this.collection = SkyMongo_1.default.createCollection(name);
    }
    cleanData(data) {
        const cleaned = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
        delete cleaned.id;
        delete cleaned._id;
        delete cleaned.createTime;
        delete cleaned.updateTime;
        return cleaned;
    }
    updateOrders(cleaned) {
        let orders = {};
        for (const [name, value] of Object.entries(cleaned)) {
            if (name === "$inc") {
                orders.$inc = value;
            }
            else if (name === "$push") {
                orders.$push = value;
            }
            else if (name === "$addToSet") {
                orders.$addToSet = value;
            }
            else if (name === "$pull") {
                orders.$pull = value;
            }
            else if (value === null) {
                if (orders.$unset === undefined) {
                    orders.$unset = {};
                }
                orders.$unset[name] = "";
            }
            else if (name[0] !== "$") {
                if (orders.$set === undefined) {
                    orders.$set = {};
                }
                orders.$set[name] = value;
            }
        }
        return orders;
    }
    async idExists(_id) {
        return await this.collection.findOne({ _id }) !== null;
    }
    async get(_id) {
        const data = await this.collection.findOne({ _id });
        if (data === null) {
            return undefined;
        }
        else {
            data.id = data._id instanceof mongodb_1.ObjectId ? data._id.toHexString() : data._id;
            delete data._id;
            return data;
        }
    }
    async find(query, sort) {
        const dataSet = sort === undefined ?
            await this.collection.find(query).toArray() :
            await this.collection.find(query).sort(sort).toArray();
        for (const data of dataSet) {
            data.id = data._id instanceof mongodb_1.ObjectId ? data._id.toHexString() : data._id;
            delete data._id;
        }
        return dataSet;
    }
    async findPart(query, sort, part) {
        const dataSet = sort === undefined ?
            await this.collection.find(query, { projection: part }).toArray() :
            await this.collection.find(query, { projection: part }).sort(sort).toArray();
        for (const data of dataSet) {
            data.id = data._id instanceof mongodb_1.ObjectId ? data._id.toHexString() : data._id;
            delete data._id;
        }
        return dataSet;
    }
    async list(query, sort, page, countPerPage) {
        const totalCount = await this.collection.countDocuments(query, {});
        const totalPage = Math.ceil(totalCount / countPerPage);
        const dataSet = sort === undefined ?
            await this.collection.find(query).skip(page * countPerPage).limit(countPerPage).toArray() :
            await this.collection.find(query).sort(sort).skip(page * countPerPage).limit(countPerPage).toArray();
        for (const data of dataSet) {
            data.id = data._id instanceof mongodb_1.ObjectId ? data._id.toHexString() : data._id;
            delete data._id;
        }
        return { dataSet, totalCount, totalPage };
    }
    async findOne(query, sort) {
        const dataSet = sort === undefined ?
            await this.collection.find(query).limit(1).toArray() :
            await this.collection.find(query).sort(sort).limit(1).toArray();
        for (const data of dataSet) {
            data.id = data._id instanceof mongodb_1.ObjectId ? data._id.toHexString() : data._id;
            delete data._id;
        }
        return dataSet[0];
    }
    async set(_id, data) {
        const cleaned = this.cleanData(data);
        if (await this.idExists(_id) !== true) {
            cleaned._id = _id;
            cleaned.createTime = Date.now();
            await this.collection.insertOne(cleaned);
        }
        else {
            cleaned.updateTime = Date.now();
            await this.collection.updateOne({ _id }, this.updateOrders(cleaned));
        }
    }
    async add(data) {
        const cleaned = this.cleanData(data);
        cleaned.createTime = Date.now();
        await this.collection.insertOne(cleaned);
    }
    async delete(_id) {
        await this.collection.deleteOne({ _id });
    }
    async createIndex(index) {
        await this.collection.createIndex(index);
    }
    async deleteIndex(index) {
        await this.collection.dropIndex(index);
    }
    async getIndexes() {
        const indexInfo = await this.collection.indexInformation();
        const indexes = [];
        for (const [, pairs] of Object.entries(indexInfo)) {
            const index = {};
            pairs.forEach((pair) => {
                index[pair[0]] = pair[1];
            });
            indexes.push(index);
        }
        return indexes;
    }
}
exports.default = DataStore;
//# sourceMappingURL=DataStore.js.map