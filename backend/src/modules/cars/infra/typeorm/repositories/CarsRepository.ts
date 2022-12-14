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

  async findAll(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

}

export { CarsRepository };