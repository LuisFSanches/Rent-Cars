import { inject } from "tsyringe";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

class CreateUserCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ 
    name, 
    username, 
    email, 
    password, 
    driver_license 
  }: ICreateUsersDTO): Promise<void> {
    
    await this.usersRepository.create({
      name, 
      username, 
      email, 
      password, 
      driver_license
    })
  }
}

export { CreateUserCase };