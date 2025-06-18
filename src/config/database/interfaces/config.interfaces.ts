import { Knex } from "knex";
import { PoolClient } from "pg";

export interface IDatabaseEnvConfig{
    client: string;
    pool?: Pool;
    migrations: Migrations;
    useNullAsDefault?: boolean;
    seeds: Seeds;
    connection: ConnectionPostgres | ConnectionSqlite;

}

export interface ConnectionPostgres {
    host: string,
    database: string,
    user: string,
    password: string,
    port: number
}

export interface Migrations {
    tableName: string;
    directory: string
}

export interface ConnectionSqlite {
    fileName: string
}
 
export interface Pool {
    afterCreate(conn: PoolClient, done: (err?: Error) => void): void
}

export interface Seeds {
    directory: string
}