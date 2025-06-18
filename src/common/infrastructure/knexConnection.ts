import { IDatabaseEnvConfig } from "@config/database/interfaces/config.interfaces";
import knex, { Knex } from "knex";

let instance: Knex | null = null;

export const getKnexIntance = (knexConfig: IDatabaseEnvConfig) => {
    if(!instance){
        instance = knex(knexConfig as Knex.Config)
    }
    return instance
}