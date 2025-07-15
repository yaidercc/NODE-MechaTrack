import { NotFoundError } from "../../../common/errors";
import { User, UserDomainFinder } from "../domain";
import { KnexUserRepository } from "../infrastructure/KnexUserRepository";
import { UserInterface } from "../interfaces/user.interface";
import { UserFinder } from "./userFinder";

export class UserDeleter {
    private readonly domainFinder: UserDomainFinder;

    constructor(private readonly repository: KnexUserRepository) {
        this.domainFinder = new UserDomainFinder(repository)
     }

    async execute(id: string, dto: { deleted_at: string }) {
        if (!id) throw new Error("id should not be empty")
        if (!dto) throw new Error("dto should not be empty")

        const user = await this.domainFinder.execute(id)

        if(!user || user.deleted_at?.value){
            throw new NotFoundError("User")
        }
        user.delete(dto)

        await this.repository.delete(user)
    }
}