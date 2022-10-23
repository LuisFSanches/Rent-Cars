import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategory } from "../ICategoriesRepository";
import { Repository } from "typeorm";
import { dataSource } from "../../../../database/ormconfig";

class CategoriesRepository implements ICategoriesRepository {
  
  private repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }
  
  async create({ name, description }: ICreateCategory): Promise<void> {
    const { repository } = this;
    const category = repository.create({
      description,
      name,
    });

    await repository.save(category);
  }

  async list():Promise<Category[]> {
    const categories = this.repository.find();
    return categories
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOneBy({ name });
    return category;
  }
}

export { CategoriesRepository };