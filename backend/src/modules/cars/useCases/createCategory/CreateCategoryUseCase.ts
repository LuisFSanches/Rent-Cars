import { inject, injectable } from "tsyringe"
import { AppError } from "../../../../errors/AppError";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  
  async execute({ description, name }: IRequest): Promise<void> {
    const { categoriesRepository } = this;
    const categoryAlreadyExists = await categoriesRepository.findByName(name);
    
    if(categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase };