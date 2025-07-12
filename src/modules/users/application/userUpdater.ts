import { KnexUserRepository } from "../infrastructure/KnexUserRepository";

export class UserUpdater {
    constructor(
        private repository: KnexUserRepository
    ){}

    async execute(){}
}