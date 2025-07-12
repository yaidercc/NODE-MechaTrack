import { ValueObjectId } from "../../../common/valueObjects";
import { KnexUserRepository } from "../infrastructure/KnexUserRepository";

export class UserDomainFinder {
    constructor(
        private readonly repository: KnexUserRepository
    ) { }

    async execute(id: string) {
        if (!id) throw new Error("id should not be empty")

        const user = await this.repository.find(new ValueObjectId("id", id));

        return user
    }
}