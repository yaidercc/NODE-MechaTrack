
import { User } from "../../domain";
import { UserResponse } from "./userResponse";

export class UserCollectionResponse {
    private userCollection: User[] | null;

    constructor(users: User[] | null) {
        this.userCollection = users;
    }

    toJson() {
        return {
            data: this.userCollection?.map((user) => new UserResponse(user).toJSON()) ?? [],

        }
    }
}