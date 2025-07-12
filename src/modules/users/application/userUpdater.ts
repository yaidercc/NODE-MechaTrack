import { User } from "../domain";
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

        const findUser = await this.userFinder.execute(id);

        const user = new User(findUser.toJSON().data as UserInterface)

        user.update(dto);

        await this.repository.update(user)

    }
}