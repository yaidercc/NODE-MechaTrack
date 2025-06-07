import { Knex } from "knex";

export async function seed(knex: Knex) {
    await knex("general_roles").del();

    await knex("general_roles").insert([
        {
            id: 'a0a63f02-0c29-4971-847b-2c844e61a11c',
            name: "client"
        },
        {
            id: '9aa1486b-4b56-4033-a417-dbe6b9bcb8da',
            name: "employee"
        }
    ])
}