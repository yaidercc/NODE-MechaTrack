import { User } from '../../src/core/users/domain/user';
import { KnexUserRepository } from '../../src/core/users/infrastructure/KnexUserRepository';
import { knexConfig } from '../knexfile';
import { UserMother } from "./domain/userMother"

describe('User unit tests', () => {
  const repository = new KnexUserRepository(knexConfig);

  beforeEach(async () => {
    await (repository as any).connection.migrate.latest();
  })
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
});
