import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  
  cars: Car[] = [];

  async create({ 
    brand, 
    category_id, 
    daily_rate, 
    description, 
    fine_amount, 
    name, 
    license_plate 
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand, 
      category_id, 
      daily_rate, 
      description, 
      fine_amount, 
      name, 
      license_plate 
    })

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAll(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars
      .filter(car => car.available === true)
      .filter(car => (brand ? car.brand === brand : car))
      .filter(car => (category_id ? car.category_id === category_id : car))
      .filter(car => (name ? car.name === name : car))

    return cars;
  }
  
}

export { CarsRepositoryInMemory };