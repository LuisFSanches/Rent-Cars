import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Repository } from "typeorm";
import { dataSource } from "../../../../../database/ormconfig";
import { User } from "../entities/User";


class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findById(id: string): Promise<User>  {
    const user = await this.repository.findOneBy({ id });
    return user;
  }

  async create({ name, email, driver_license, password, avatar, id }: ICreateUsersDTO): Promise<void> {
    const { repository } = this;

    const user = repository.create({
      name, 
      email, 
      driver_license, 
      password,
      avatar,
      id
    })

    await repository.save(user);
  }
}

export { UsersRepository };