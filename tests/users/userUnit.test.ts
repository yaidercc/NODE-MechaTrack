import { User } from '../../src/modules/users/domain/user';
import { KnexUserRepository } from '../../src/modules/users/infrastructure/KnexUserRepository';
import { knexConfig } from '../knexfile';
import { UserMother } from "./domain/userMother"
import { symbol } from 'joi';

describe('User unit tests', () => {
  const repository = new KnexUserRepository(knexConfig);

  beforeEach(async () => {
    await (repository as any).connection.migrate.latest();
  })
  afterAll(async () => {
    await (repository as any).connection.destroy();
  });

  it('should create a new user', async () => {
    const user = UserMother.dto();
    const newUser = User.create(user)

    expect(newUser).toBeInstanceOf(User)

    expect(user.id).toBe(newUser.id.value)
    expect(user.name).toBe(newUser.name.value)
    expect(user.last_name).toBe(newUser.last_name.value)
    expect(user.email).toBe(newUser.email.value)
    expect(user.password).toBe(newUser.password.value)
    expect(user.phone).toBe(newUser.phone.value)
    expect(user.general_role_id).toBe(newUser.general_role_id.value)
    expect(user.created_at).toBe(newUser.created_at?.value)
  });

  it('should not create a new user with wrong data type', () => {

    expect(() => {
      User.create({
        id: true + "true" as any,
        name: 2303232 as any,
        last_name: false as any,
        email: { a: 1 } as any,
        password: { abce: "23" } as any,
        phone: symbol() as any,
        general_role_id: {} as any,
        created_at: [] as any,
      });
    }).toThrow(Error);
  });

  it('should update an user', async () => {
    const newUser = User.create(UserMother.dto())

    const dto = {
      name: "john",
      last_name: "florez"
    }

    newUser.update(dto)

    expect(newUser.name.value).toBe(1)
    expect(newUser.last_name.value).toBe(dto.last_name)
  });

  it('should flush the changed attributes', () => {
    const user = User.create(UserMother.dto());

    user.update({ name: "rogelio" });

    expect(Object.keys(user.changedAttributes).length).toBeGreaterThan(0);

    user.flushChanges();

    expect(Object.keys(user.changedAttributes)).toHaveLength(0);
  });


  it('should delete an user', async () => {
    const newUser = User.create(UserMother.dto())

    const dto = {
      deleted_at: new Date(),
    }
    newUser.delete(dto)

    expect(newUser.deleted_at?.value).toBeDefined()
    expect(newUser.deleted_at?.value).toBe(dto.deleted_at)
  });


});
