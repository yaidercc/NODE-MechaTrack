import { Criteria } from "../../criteria/criteria"
import { ValueObjectId } from "../../valueObjects/index"
import { AggregateRoot } from "../../domain/aggregateRoot"
import { KnexRepository } from "../knexRepository"

export interface Repository<T> extends Pick<KnexRepository, 'connection' | 'tableName'> {
    save(dto: T): Promise<void>;
    find(id: ValueObjectId): Promise<T>;
    search(criteria: Criteria): Promise<T[]>;
}