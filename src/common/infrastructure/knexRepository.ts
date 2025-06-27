import { IDatabaseEnvConfig } from "@config/database/interfaces/config.interfaces";
import knex, { Knex } from "knex";
import { UpdateAggregate } from "./interfaces/infrastructure.interfaces";
import { AggregateRoot } from "@common/domain/aggregateRoot";

export class KnexRepository {
    private connection: Knex;

    constructor(
        public config: IDatabaseEnvConfig,
        public tableName: string
    ) {
        if (typeof config !== 'function') {
            this.connection = knex(config as Knex.Config)
        } else {
            this.connection = config
        }
    }

    get Connection(): Knex {
        return this.connection;
    }

    get TableName(): string {
        return this.TableName;
    }

    async update<T extends object>(aggregate: AggregateRoot<T>) {
        try {
            await this.connection(this.tableName)
                .update(aggregate.changedAttributes)
                .where({ id: aggregate.id.value })
                .whereNull("deleted_at")
        } catch (error) {
            console.log(error);
            throw new Error("An unexpected error occured.")
        }
    }

    async delete<T>(aggregate: AggregateRoot<T>) {
        await this.update(aggregate);
    }
}