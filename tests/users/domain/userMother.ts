import { Repository } from "../../../src/common/infrastructure/interfaces/infrastructure.interfaces"
import { User } from "../../../src/core/users/domain/user"
import { KnexUserRepository } from "../../../src/core/users/infrastructure/KnexUserRepository";
import { User as UserInterface } from "../../../src/core/users/interfaces/user.interface"
import { v4 as uuid } from "uuid"

export class UserMother {
    static dto(user?:UserInterface ):UserInterface {
        return {
            id: uuid(),
            name: 'Miles',
            last_name: 'Morales',
            email: 'miles.morales@example.com',
            password: 'Str0ngP@ssword!',
            phone: '573001112233',
            general_role_id: user?.general_role_id || '8f86b1c2-4a1e-4adf-9a5e-bd9b0a3e1234', 
            created_at: new Date(), 
        };

    }

    static async createUser(repository: KnexUserRepository, overrides: UserInterface) {
        const user = User.create(overrides)
        await repository.save(user);
        return user
    }
}