import { Knex } from "knex";

export function up(knex: Knex){
    return knex.schema.createTable("general_roles", function (table: Knex.TableBuilder){
        table.uuid('id').primary();
        table.string("name", 20).notNullable();
    })
}

export function down(knex: Knex){
    return knex.schema.dropTable("general_roles")
}