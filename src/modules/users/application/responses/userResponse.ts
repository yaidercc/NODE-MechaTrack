import { User } from "../domain";
import { UserInterface } from "../interfaces/user.interface";
import { UserResponseInterface } from "../interfaces/userResponseInterface";

export class UserResponse {
    private user: User;

    constructor(user: User) {
        this.user = user;
    }

    toJSON(): UserResponseInterface {
        if (!this.user) return { data: {} };
        return {
            data: {
                id: this.user.id.value,
                name: this.user.name.value,
                last_name: this.user.last_name.value,
                email: this.user.email.value,
                password: this.user.password.value,
                phone: this.user.phone.value,
                general_role_id: this.user.general_role_id.value,
                created_at: this.user.created_at?.value ?? undefined,
                updated_at: this.user.updated_at?.value ?? undefined,
            }
        };
    }
}
