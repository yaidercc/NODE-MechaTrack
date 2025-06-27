import { Repository } from "@common/infrastructure/interfaces/infrastructure.interfaces";
import { KnexRepository } from "@common/infrastructure/knexRepository";
import { User } from "../domain/user";
import { Criteria } from "@common/criteria/criteria";

export class KnexUserRepository extends KnexRepository implements Repository<User>{
    
    save(dto: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: ValueObjectId): Promise<User> {
        throw new Error("Method not implemented.");
    }
    search(criteria: Criteria): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

}