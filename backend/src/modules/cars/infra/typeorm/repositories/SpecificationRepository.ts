import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { Repository } from "typeorm";

import { dataSource } from "../../../../../database/ormconfig";
import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = dataSource.getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOneBy({ name });
    return specification;
  }

}

export { SpecificationRepository };