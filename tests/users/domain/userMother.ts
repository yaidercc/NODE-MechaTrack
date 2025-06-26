import { RepositoryFile } from "../../../src/common/infrastructure/interfaces/infrastructure.interfaces"
import { User } from "../../../src/core/users/domain/user"
import { User as UserInterface } from "../../../src/core/users/interfaces/user.interface"
import { v4 as uuid } from "uuid"

export class UserMother {
    static dto(user: UserInterface) {
        return {
            id: uuid(),
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            general_role_id: user.general_role_id,
            created_at: user.created_at,
        }
    }

    static async createUser(repository: RepositoryFile<User>, overrides: UserInterface) {
        const user = User.create(overrides)
        await repository.save(user);
        return user
    }
}