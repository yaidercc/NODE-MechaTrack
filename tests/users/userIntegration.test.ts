import { KnexUserRepository } from "../../src/modules/users/infrastructure/KnexUserRepository";
import { knexConfig } from "../knexfile";
import { UserCreator, UserDeleter, UserFinder, UserLogin, UserSearcher, UserUpdater } from ".././../src/modules/users/application"
import { UserMother } from "./domain/userMother";
import { AlreadyExistsError, NotFoundError } from "../../src/common/errors";

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
        await new UserCreator(repository).execute(userDTO);

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
        const creator = new UserCreator(repository);

        await creator.execute(userDTO);

        await expect(() => creator.execute(userDTO)).rejects.toThrow(AlreadyExistsError);
    });


    it("should find an user", async () => {
        const userDTO = UserMother.dto();
        await new UserCreator(repository).execute(userDTO);

        const findUser = (await new UserFinder(repository).execute(userDTO.id)).toJSON()
        expect(findUser).toMatchObject({
            name: userDTO.name,
            last_name: userDTO.last_name,
            email: userDTO.email,
            password: userDTO.password,
            phone: userDTO.phone,
            general_role_id: userDTO.general_role_id,
        })
        expect(findUser.id).toBeDefined()
    });


    it("should update an user", async () => {
        const userDTO = UserMother.dto();
        await new UserCreator(repository).execute(userDTO);

        const dto = {
            name: "rodrigo",
            last_name: "garcia",
            updated_at: new Date().toISOString()
        }

        await new UserUpdater(repository).execute(userDTO.id, dto);

        const findUser = (await new UserFinder(repository).execute(userDTO.id)).toJSON()

        expect(findUser.name).toBe(dto.name)
        expect(findUser.last_name).toBe(dto.last_name)
    });


    it("should update an user with an existant email", async () => {
        const user1DTO = UserMother.randomDTO()
        const user2DTO = UserMother.randomDTO()
        await new UserCreator(repository).execute(user1DTO);
        await new UserCreator(repository).execute(user2DTO);
        const updater = new UserUpdater(repository);

        const dto = {
            email: user2DTO.email,
            updated_at: new Date().toISOString()
        }

        await expect(() => updater.execute(user1DTO.id, dto)).rejects.toThrow(AlreadyExistsError);

    });


    it("should delete an user", async () => {
        const userDTO = UserMother.dto();
        await new UserCreator(repository).execute(userDTO);
        const finder = new UserFinder(repository);

        const dto = {
            deleted_at: new Date().toISOString()
        }

        await new UserDeleter(repository).execute(userDTO.id, dto);

        await expect(() => finder.execute(userDTO.id)).rejects.toThrow(NotFoundError);

    });


    it('Should Find a user by a criteria', async () => {
        const userDto = UserMother.dto();
        await UserMother.createUser(repository, userDto);

        const criteria = {
            filters: [{
                field: "name",
                type: "and",
                operator: "=",
                value: userDto.name
            }],
            limit: 10,
            offset: 0,
            order: {
                field: 'created_at',
                direction: 'desc',
            },
        }

        const SearchedUser = (await new UserSearcher(repository).execute(criteria)).toJson();
        expect(SearchedUser.data[0].id).toBe(userDto.id)
    })


    it('Should login a user', async () => {
        const userDTO = UserMother.dto();
        await UserMother.createUser(repository, userDTO);

        const loginUser = await new UserLogin(repository).execute(userDTO.email,"Str0ngP@ssword!")
        
        expect(loginUser.user).toMatchObject({
            name: userDTO.name,
            last_name: userDTO.last_name,
            email: userDTO.email,
            password: userDTO.password,
            phone: userDTO.phone,
            general_role_id: userDTO.general_role_id
        })
        expect(loginUser).toHaveProperty("token")
    })


})