const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");


class UserCreateService{
  
  constructor(userRepository){
    this.userRepository = userRepository; //deixa o userRepository atribuído disponível para toda a classe
  }

  async execute({name, email, password}){
        
    const checkUserExists = await this.userRepository.findByEmail(email); //pressupoe que tem uma função findByEmail

    if (checkUserExists) {
        throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = await hash(password, 8);
    
    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword });

    return userCreated;

  }
}

module.exports = UserCreateService