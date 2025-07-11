import { AlreadyExistsError } from "../../../common/errors";
import { User } from "../domain/user";
import { ValueObjectEmail } from "../domain/valueObjects/email.vo";
import { KnexUserRepository } from "../infrastructure/KnexUserRepository";
import { UserInterface } from "../interfaces/user.interface";

export class userCreator {
    constructor(
        private repository: KnexUserRepository
    ) { }

    async execute(dto: UserInterface) {
        if (!dto) throw new Error("dto should not be empty")
        const existsUser = await this.repository.find(new ValueObjectEmail(dto.email))

        if(existsUser){
            throw new AlreadyExistsError("User",`email: ${dto.email}`)
        }
        const user = User.create(dto);
        await this.repository.save(user)
    }
}