const AppError = require("../utils/AppError");

const UserCreateService = require('./UserCreateService')
const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory');

describe("UserCreateService", () => {
  
  it("should be able to create a new user", async () => { 
    const user = {
      name: 'User test',
      email: 'a@b.com',
      password: '123456'
    };
  
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const userCreateService = new UserCreateService(userRepositoryInMemory);
    const userCreated = await userCreateService.execute(user);
  
    expect(userCreated).toHaveProperty('id');
  
  
  })

  it("should not be able to create a new user with same email", async () => {
    const user1 = {
      name: 'User test 1',
      email: 'a@b.com',
      password: '123456'
    };

    const user2 = {
      name: 'User test 2',
      email: 'a@b.com',
      password: '123456'
    };

    const userRepositoryInMemory = new UserRepositoryInMemory();
    const userCreateService = new UserCreateService(userRepositoryInMemory);
    await userCreateService.execute(user1);
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já está em uso."));

  });

});