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
    const { usersRepository } = this;

    const userAlreadyExists = await usersRepository.findByEmail(email);

    if(userAlreadyExists) throw new Error("User already registered");

    const passwordHash = await hash(password, 8);

    usersRepository.create({
      name, 
      email, 
      password: passwordHash, 
      driver_license
    });
  }
}

export { CreateUserCase };