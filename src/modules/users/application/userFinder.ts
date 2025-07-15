import { NotFoundError } from "../../../common/errors";
import { UserDomainFinder } from "../domain";
import { KnexUserRepository } from "../infrastructure/KnexUserRepository";
import { UserResponse } from "./responses/userResponse";

export class UserFinder {
    private domainUserFinder: UserDomainFinder

    constructor(
        private readonly repository: KnexUserRepository,
    ) {
        this.domainUserFinder = new UserDomainFinder(repository)

    }

    async execute(id: string) {
        if (!id) throw new Error("id should not be empty")
        const user = await this.domainUserFinder.execute(id)

        if(!user || user.deleted_at?.value){
            throw new NotFoundError("User not found")
        }

        return new UserResponse(user)
    }
}