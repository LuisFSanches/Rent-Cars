import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all availables cars", async () => {

    await carsRepositoryInMemory.create({
      name: "Audi A1",
      description: "Carro com espaço",
      daily_rate: 110,
      license_plate: "AEF-1234",
      fine_amount: 80,
      brand: "Audi",
      category_id: "1"
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars.length).toBeGreaterThan(0);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Carro com espaço",
      daily_rate: 110,
      license_plate: "AEF-1234",
      fine_amount: 80,
      brand: "Car_brand_test",
      category_id: "1"
    });

    const cars =  await listAvailableCarsUseCase.execute({
      brand: 'Car_brand_test'
    });
    
    expect(cars).toEqual([car]);

  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Carro com espaço",
      daily_rate: 110,
      license_plate: "AEF-1234",
      fine_amount: 80,
      brand: "Car_brand_test",
      category_id: "1"
    });

    const cars =  await listAvailableCarsUseCase.execute({
      name: 'Car2'
    });
    
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Carro com espaço",
      daily_rate: 110,
      license_plate: "AEF-1234",
      fine_amount: 80,
      brand: "Car_brand_test",
      category_id: "12345"
    });

    const cars =  await listAvailableCarsUseCase.execute({
      category_id: '12345'
    });
    
    expect(cars).toEqual([car]);
  })
})