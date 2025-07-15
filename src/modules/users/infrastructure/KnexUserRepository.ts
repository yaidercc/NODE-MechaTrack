import { Repository } from "../../../common/infrastructure/interfaces/infrastructure.interfaces";
import { KnexRepository } from "../../../common/infrastructure/knexRepository";
import { User } from "../domain/user";
import { Criteria } from "../../../common/criteria/criteria";
import { ValueObject, ValueObjectId } from "../../../common/valueObjects";
import { IDatabaseEnvConfig } from "../../../config/database/interfaces/config.interfaces";
import { Knex } from "knex";

export class KnexUserRepository extends KnexRepository implements Repository<User> {
    constructor(config: IDatabaseEnvConfig | Knex) {
        super(config, 'users')
    }
    async find(criteria: ValueObject<string | number | boolean>): Promise<User | null> {
        if (!criteria?.value) throw new Error("Value must be provided for finder function")
        const queryField = {
            [criteria.field]: criteria.value
        }
        try {
            const user = await this.connection(this.tableName).select("*").where(queryField).first()
            console.log(user)
            return user ? new User(user) : null
        } catch (error) {
            console.log(error)
            throw new Error("An unexpected error occured.")
        }
    }
    async save(dto: User): Promise<void> {
        try {
            await this.connection(this.tableName).insert({
                id: dto.id.value,
                name: dto.name.value,
                last_name: dto.last_name.value,
                email: dto.email.value,
                password: dto.password.value,
                phone: dto.phone.value,
                general_role_id: dto.general_role_id.value,
                created_at: dto.created_at?.value,
            })

        } catch (error) {
            console.log(error)
            throw new Error("An unexpected error occured.")
        }
    }

    search(criteria: Criteria): Promise<User[]> {
        throw new Error("Method not implemented.");
    }


}