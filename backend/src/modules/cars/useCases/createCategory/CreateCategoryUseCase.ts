import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
class CreateCategoryUseCase {

  constructor(private categoriesRepository: ICategoriesRepository) {}
  
  async execute({ description, name }: IRequest): Promise<void> {
    const { categoriesRepository } = this;
    const categoryAlreadyExists = await categoriesRepository.findByName(name);
    
    if(categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase };