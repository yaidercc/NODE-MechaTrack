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
        table.timestamps(true, true);
        table.dateTime("deleted_at");
    })
}

export function down(knex: Knex) {
    return knex.schema.dropTable("users")
}