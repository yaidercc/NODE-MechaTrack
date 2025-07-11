import { KnexUserRepository } from "../../src/modules/users/infrastructure/KnexUserRepository";
import { knexConfig } from "../knexfile";
import { userCreator } from ".././../src/modules/users/application"
import { UserMother } from "./domain/userMother";
import { AlreadyExistsError } from "../../src/common/errors";

describe("User intregration tests", () => {
    const repository = new KnexUserRepository(knexConfig);

    beforeEach(async () => {
        await (repository as any).connection.migrate.latest();
    })
    afterEach(async () => {
        await repository.connection.migrate.rollback(undefined, true);
    });


    it("should create a new user", async () => {
        const userDTO = UserMother.dto()
        await new userCreator(repository).execute(userDTO);

        const createdUser = await repository.connection("users").select("*").where("id", userDTO.id).limit(1)

        expect(createdUser.length).toBeGreaterThan(0)
        expect(createdUser[0]).toMatchObject(
            {
                name: userDTO.name,
                last_name: userDTO.last_name,
                email: userDTO.email,
                password: userDTO.password,
                phone: userDTO.phone,
                general_role_id: userDTO.general_role_id,
            }
        )
    })

    it("should not create repeated users", async () => {
        const userDTO = UserMother.dto();
        const creator = new userCreator(repository);

        await creator.execute(userDTO);

        await expect(()=>creator.execute(userDTO)).rejects.toThrow(AlreadyExistsError);
    });

})