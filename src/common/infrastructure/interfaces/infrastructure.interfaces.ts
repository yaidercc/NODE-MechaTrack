import { Criteria } from "../../criteria/criteria"
import { ValueObject, ValueObjectId } from "../../valueObjects/index"
import { AggregateRoot } from "../../domain/aggregateRoot"
import { KnexRepository } from "../knexRepository"

export interface Repository<T> extends Pick<KnexRepository, 'connection' | 'tableName'> {
    save(dto: T): Promise<void>;
    find(id: ValueObject<string | number | boolean>): Promise<T | null>;
    search(criteria: Criteria): Promise<T[]  | null>;
}