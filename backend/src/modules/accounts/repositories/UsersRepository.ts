import { Repository } from "typeorm";
import { dataSource } from "../../../database/ormconfig";
import { ICreateUsersDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create({ name, username, email, driver_license, password }: ICreateUsersDTO): Promise<void> {
    const { repository } = this;

    const user = repository.create({
      name, 
      username, 
      email, 
      driver_license, 
      password
    })

    await repository.save(user);
    throw new Error()
  }
}

export { UsersRepository };