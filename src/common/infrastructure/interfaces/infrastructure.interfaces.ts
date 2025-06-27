import { Criteria } from "@common/criteria/criteria"
import { ValueObjectId } from "@common/index"

export interface UpdateAggregate<T> {
    changedAttributes: T,
    id: {
        value: string
    }
}

export interface Repository<T> {
    save(dto: T): Promise<void>,
    find(id: ValueObjectId): Promise<T>,
    search(criteria: Criteria): Promise<T[]>,
    update(dto: T): Promise<void>,
    delete(id: ValueObjectId): Promise<void>,
}