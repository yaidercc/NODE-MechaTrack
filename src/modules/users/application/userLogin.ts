import { NotFoundError } from "../../../common/errors";
import { ValueObjectEmail } from "../domain/valueObjects/email.vo";
import { KnexUserRepository } from "../infrastructure/KnexUserRepository";
import bcrypt from "bcryptjs"
import { UserResponse } from "./responses/userResponse";
import { generateJWT } from "../../../auth/generateJWT";

export class UserLogin {

    constructor(
        private readonly repository: KnexUserRepository
    ) { }

    async execute(email: string, password: string) {

        const user = await this.repository.find(new ValueObjectEmail(email))
        if (!user || user.deleted_at?.value) {
            throw new NotFoundError("Credentials are not valid")
        }
        
        if (!bcrypt.compareSync(password, user.password.value)) {
            throw new Error("Credentials are not valid")
        }

        const userInfo = {
            user: new UserResponse(user).toJSON(),
            token: await generateJWT(user.id.value)
        }

        return userInfo
    }
}