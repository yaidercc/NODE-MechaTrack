import { Knex } from "knex";

export function up(knex: Knex) {
    return knex.schema.createTable('users', function (table: Knex.TableBuilder) {
        table.uuid('id').primary();
        table.string('name', 100).notNullable();
        table.string('last_name', 100).notNullable();
        table.string('email', 70).notNullable().unique();
        table.string('password',100).notNullable();
        table.string('phone',12).notNullable();
        table.uuid('general_role_id').notNullable().references('id').inTable('general_roles');
        table.datetime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        table.datetime('updated_at').nullable();
        table.datetime('deleted_at').nullable();
    })
}

export function down(knex: Knex) {
    return knex.schema.dropTable("users")
}