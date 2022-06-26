import { Filter, ObjectId, Sort, UpdateFilter } from "mongodb";
import DbData from "./DbData";
export default class DataStore<DT> {
    private collection;
    constructor(name: string, alias?: string);
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
    update(_id: number | string | ObjectId, data: Partial<DT> | UpdateFilter<DT>, arrayFilters?: any[]): Promise<void>;
    add(data: DT): Promise<any>;
    delete(_id: number | string | ObjectId): Promise<void>;
    createIndex(index: any): Promise<void>;
    deleteIndex(index: any): Promise<void>;
    getIndexes(): Promise<any[]>;
}
//# sourceMappingURL=DataStore.d.ts.map