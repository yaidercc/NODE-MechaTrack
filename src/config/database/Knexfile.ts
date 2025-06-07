import { config } from "dotenv";
import path from "path";
import { PoolClient } from "pg"
import { ConnectionPostgres, IDatabaseEnvConfig } from "./interfaces/interfaces";
import { requiredEnv } from "../../common";

config({ path: path.resolve(__dirname, "../../../.env") })


const connection: ConnectionPostgres = {
    host: requiredEnv(process.env.DB_HOST, 'DB_HOST'),
    database: requiredEnv(process.env.DB_NAME, 'DB_NAME'),
    user: requiredEnv(process.env.DB_USER, 'DB_USER'),
    password: requiredEnv(process.env.DB_PASSWORD, 'DB_PASSWORD'),
    port: Number(requiredEnv(process.env.DB_PORT, 'DB_PORT'))
}
console.log(connection)

const schema: string = process.env.DB_SCHEMA ?? "public";

const setSchema = async (conn: PoolClient, done: (err?: Error) => void): Promise<void> => {
    try {
        await conn.query('SET timezone="UTC";');
        await conn.query(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
        await conn.query(`SET search_path TO ${schema};`);
        done();
    } catch (err) {
        done(err as Error);
    }
}

export const development: IDatabaseEnvConfig = {
    client: "pg",
    pool: {
        afterCreate: setSchema
    },
    migrations: {
        directory: "./migrations",
        tableName: "knex_migrations"
    },
    seeds: {
        directory: "./seeds"
    },
    connection: {
        ...connection
    }
}

export const testing: IDatabaseEnvConfig = {
    client: "sqlite3",
    connection: {
        fileName: ":memory:"
    },
    useNullAsDefault: true,
    migrations: {
        tableName: "knex_migrations",
        directory: "./src/config/database/migrations"
    },
    seeds: {
        directory: "./seedsF"
    }
}

