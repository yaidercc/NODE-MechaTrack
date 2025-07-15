import { QueryParams } from "src/common/criteria/interfaces/criteria.interfaces";
import { KnexUserRepository } from "../infrastructure/KnexUserRepository";
import { UserCollectionResponse } from "./responses/userCollectionResponse";
import { Criteria } from "../../../common/criteria";


export class UserSearcher {


    constructor(private repository: KnexUserRepository) { }

    async execute({ filters, order, limit, offset }: QueryParams) {
        const criteria = new Criteria({ filters, order, limit, offset });
        const rows = await this.repository.search(criteria);

        return new UserCollectionResponse(rows)
    }
}

