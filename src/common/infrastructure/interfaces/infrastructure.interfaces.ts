import { Criteria } from "@common/criteria/criteria"
import { AggregateRoot, ValueObjectId } from "@common/index"
import { KnexRepository } from "../knexRepository"

export interface Repository<T> extends Pick<KnexRepository, 'connection' | 'tableName'> {
    save(dto: T): Promise<void>;
    find(id: ValueObjectId): Promise<T>;
    search(criteria: Criteria): Promise<T[]>;
}