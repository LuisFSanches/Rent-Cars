import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@errors/AppError";

@injectable()
class CreateUserUseCase {
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

    if(userAlreadyExists) throw new AppError("User already registered");

    const passwordHash = await hash(password, 8);

    usersRepository.create({
      name, 
      email, 
      password: passwordHash, 
      driver_license
    });
  }
}

export { CreateUserUseCase };