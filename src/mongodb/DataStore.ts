import { Collection, Filter, ObjectId, Sort, UpdateFilter } from "mongodb";
import DbData from "./DbData";
import SkyMongo from "./SkyMongo";

export default class DataStore<DT> {

    private collection: Collection;

    constructor(name: string, alias?: string) {
        this.collection = SkyMongo.createCollection(name, alias);
    }

    private cleanDataForUpdate(data: any): any {
        delete data.id;
        delete data._id;
        delete data.createTime;
        delete data.updateTime;
        return data;
    }

    private cleanData(data: any): any {
        const cleaned = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
        return this.cleanDataForUpdate(cleaned);
    }

    private updateOrders(cleaned: any) {
        let orders: any = {};
        for (const [name, value] of Object.entries(cleaned)) {
            if (name === "$inc") { orders.$inc = value; }
            else if (name === "$push") { orders.$push = value; }
            else if (name === "$addToSet") { orders.$addToSet = value; }
            else if (name === "$pull") { orders.$pull = value; }
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

    public async idExists(_id: number | string | ObjectId): Promise<boolean> {
        return await this.collection.findOne({ _id }) !== null;
    }

    public async get(_id: number | string | ObjectId): Promise<(DT & DbData) | undefined> {
        const data: any = await this.collection.findOne({ _id });
        if (data === null) {
            return undefined;
        } else {
            data.id = data._id instanceof ObjectId ? data._id.toHexString() : data._id;
            delete data._id;
            return data;
        }
    }

    public async find(query: Filter<DT>, sort?: Sort): Promise<(DT & DbData)[]> {
        const dataSet = sort === undefined ?
            await this.collection.find(query as any).toArray() as any :
            await this.collection.find(query as any).sort(sort).toArray() as any;
        for (const data of dataSet) {
            data.id = data._id instanceof ObjectId ? data._id.toHexString() : data._id;
            delete data._id;
        }
        return dataSet;
    }

    public async findPart(
        query: Filter<DT>,
        sort: Sort | undefined,
        part: { [key: string]: number },
    ): Promise<Partial<DT & DbData>[]> {
        const dataSet = sort === undefined ?
            await this.collection.find(query as any, { projection: part }).toArray() as any :
            await this.collection.find(query as any, { projection: part }).sort(sort).toArray() as any;
        for (const data of dataSet) {
            data.id = data._id instanceof ObjectId ? data._id.toHexString() : data._id;
            delete data._id;
        }
        return dataSet;
    }

    public async list(
        query: Filter<DT>, sort: Sort | undefined,
        page: number, countPerPage: number,
    ): Promise<{
        dataSet: (DT & DbData)[],
        totalCount: number,
        totalPage: number,
    }> {
        const totalCount = await this.collection.countDocuments(query as any, {});
        const totalPage = Math.ceil(totalCount / countPerPage);
        const dataSet = sort === undefined ?
            await this.collection.find(query as any).skip(page * countPerPage).limit(countPerPage).toArray() as any :
            await this.collection.find(query as any).sort(sort).skip(page * countPerPage).limit(countPerPage).toArray() as any;
        for (const data of dataSet) {
            data.id = data._id instanceof ObjectId ? data._id.toHexString() : data._id;
            delete data._id;
        }
        return { dataSet, totalCount, totalPage };
    }

    public async findOne(query: Filter<DT>, sort?: Sort): Promise<(DT & DbData) | undefined> {
        const dataSet = sort === undefined ?
            await this.collection.find(query as any).limit(1).toArray() as any :
            await this.collection.find(query as any).sort(sort).limit(1).toArray() as any;
        for (const data of dataSet) {
            data.id = data._id instanceof ObjectId ? data._id.toHexString() : data._id;
            delete data._id;
        }
        return dataSet[0];
    }

    public async set(_id: number | string, data: DT) {
        if (await this.idExists(_id) !== true) {
            const cleaned = this.cleanData(data);
            cleaned._id = _id;
            cleaned.createTime = Date.now();
            await this.collection.insertOne(cleaned);
        } else {
            const cleaned = this.cleanDataForUpdate(data);
            cleaned.updateTime = Date.now();
            await this.collection.updateOne({ _id }, this.updateOrders(cleaned));
        }
    }

    public async create(_id: number | string, data: DT) {
        const cleaned = this.cleanData(data);
        cleaned._id = _id;
        cleaned.createTime = Date.now();
        await this.collection.insertOne(cleaned);
    }

    public async update(_id: number | string | ObjectId, data: Partial<DT> | UpdateFilter<DT>, arrayFilters?: any[]) {
        const cleaned = this.cleanDataForUpdate(data);
        cleaned.updateTime = Date.now();
        await this.collection.updateOne({ _id }, this.updateOrders(cleaned), {
            arrayFilters,
        });
    }

    public async add(data: DT) {
        const cleaned = this.cleanData(data);
        cleaned.createTime = Date.now();
        await this.collection.insertOne(cleaned);
    }

    public async delete(_id: number | string | ObjectId) {
        await this.collection.deleteOne({ _id });
    }

    public async createIndex(index: any) {
        await this.collection.createIndex(index);
    }

    public async deleteIndex(index: any) {
        await this.collection.dropIndex(index);
    }

    public async getIndexes() {
        const indexInfo = await this.collection.indexInformation();
        const indexes = [];
        for (const [, pairs] of Object.entries(indexInfo)) {
            const index: any = {};
            (pairs as any[]).forEach((pair: any[]) => {
                index[pair[0]] = pair[1];
            });
            indexes.push(index);
        }
        return indexes;
    }
}
