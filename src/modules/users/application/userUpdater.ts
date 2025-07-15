import { AlreadyExistsError } from "../../../common/errors";
import { User } from "../domain";
import { ValueObjectEmail } from "../domain/valueObjects/email.vo";
import { KnexUserRepository } from "../infrastructure/KnexUserRepository";
import { UserInterface } from "../interfaces/user.interface";
import { UserFinder } from "./userFinder";

export class UserUpdater {
    private userFinder: UserFinder

    constructor(
        private readonly repository: KnexUserRepository,
    ) {
        this.userFinder = new UserFinder(repository)
    }

    async execute(id: string, dto: Partial<UserInterface>) {
        if (!id) throw new Error("id should not be empty")
        if (!dto) throw new Error("dto should not be empty")

        const { general_role_id, ...userDto } = dto // only the admin can perform this action

        const findUser = await this.userFinder.execute(id);

        if (dto?.email) {
            const findEmail = await this.repository.find(new ValueObjectEmail(dto.email))
            if (findEmail && findEmail.id.value !== id) {
                throw new AlreadyExistsError("User", `Email ${dto.email}, is already in use.`)
            }
        }
        const user = new User(findUser.toJSON().data as UserInterface)

        user.update(userDto);

        await this.repository.update(user)

    }
}