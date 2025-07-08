import { Knex } from "knex";
import bcryptjs from "bcryptjs";

export async function seed(knex: Knex) {
    const password = `2b873cc3f3c9`;
    const salt = bcryptjs.genSaltSync();
    const hashedPassword = bcryptjs.hashSync(password, salt);
    await knex("users").del();

    await knex('users').insert({
        id: "19c8c704-9fee-414c-bf7f-4251f94b9238",
        name: "yaider",
        last_name: "cordoba cordoba",
        email: "yaider@gmail.com",
        password: hashedPassword,
        phone: "573137563821",
        general_role_id: "a0a63f02-0c29-4971-847b-2c844e61a11c",
    })
}