import { config } from "dotenv";
import path from "path";
import { PoolClient } from "pg"
import { ConnectionPostgres, IDatabaseEnvConfig } from "./interfaces/interfaces";

config({ path: path.resolve(__dirname, "../../../.env") })


const connection: ConnectionPostgres = {
    host: process.env.DB_HOST ?? "db",
    database: process.env.DB_NAME ?? "mechatrack",
    user: process.env.DB_USER ?? "yaidercc",
    password: process.env.DB_PASSWORD ?? "yaidercc123",
    port: Number(process.env.DB_PORT) ?? 4000
}

const schema: string = process.env.DB_SCHEMA ?? "public";

const setSchema = (conn: PoolClient, done: (err?: Error) => void): void => {
    conn.query('SET timezone="UTC";', done)
    conn.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`, done)
    conn.query(`SET search_path TO ${schema};`, done)
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
    client: "sqltie3",
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

