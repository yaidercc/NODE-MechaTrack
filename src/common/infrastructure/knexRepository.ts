import { IDatabaseEnvConfig } from "@config/database/interfaces/config.interfaces";
import knex, { Knex } from "knex";
import { AggregateRoot } from "@common/domain/aggregateRoot";

export class KnexRepository {
    private _connection: Knex;

    constructor(
        public config: Knex | IDatabaseEnvConfig,
        public tableName: string
    ) {
        if ('raw' in config) {
            this._connection = config;
        } else {
            this._connection = knex(config as Knex.Config);
        }
    }

    public get connection(): Knex {
        return this._connection;
    }


    async update<T extends object>(aggregate: AggregateRoot<T>) {
        try {
            await this._connection(this.tableName)
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