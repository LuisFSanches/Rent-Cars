import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { dataSource } from "database/ormconfig";
import { Repository } from "typeorm";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {

  private repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name
  }: ICreateCarDTO): Promise<Car> {
    const { repository } = this;

    const car = repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    })

    await repository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOneBy({ license_plate });
    return car;
  }

}

export { CarsRepository };