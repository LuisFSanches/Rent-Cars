import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ 
    name,  
    email, 
    password, 
    driver_license 
  }: ICreateUsersDTO): Promise<void> {
    
    const passwordHash = await hash(password, 8);

    this.usersRepository.create({
      name, 
      email, 
      password: passwordHash, 
      driver_license
    });
  }
}

export { CreateUserCase };