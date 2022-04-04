import { Filter, ObjectId, Sort } from "mongodb";
import DbData from "./DbData";
export default class DataStore<DT> {
    private collection;
    constructor(name: string);
    private cleanDataForUpdate;
    private cleanData;
    private updateOrders;
    idExists(_id: number | string | ObjectId): Promise<boolean>;
    get(_id: number | string | ObjectId): Promise<(DT & DbData) | undefined>;
    find(query: Filter<DT>, sort?: Sort): Promise<(DT & DbData)[]>;
    findPart(query: Filter<DT>, sort: Sort | undefined, part: {
        [key: string]: number;
    }): Promise<Partial<DT & DbData>[]>;
    list(query: Filter<DT>, sort: Sort | undefined, page: number, countPerPage: number): Promise<{
        dataSet: (DT & DbData)[];
        totalCount: number;
        totalPage: number;
    }>;
    findOne(query: Filter<DT>, sort?: Sort): Promise<(DT & DbData) | undefined>;
    set(_id: number | string, data: DT): Promise<void>;
    create(_id: number | string, data: DT): Promise<void>;
    update(_id: number | string | ObjectId, data: any, arrayFilters?: any[]): Promise<void>;
    add(data: DT): Promise<void>;
    delete(_id: number | string): Promise<void>;
    createIndex(index: any): Promise<void>;
    deleteIndex(index: any): Promise<void>;
    getIndexes(): Promise<any[]>;
}
//# sourceMappingURL=DataStore.d.ts.map