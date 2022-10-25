import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ISpecificationsRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationsRepository
  ) {}
  
  async execute({ description, name }: IRequest): Promise<void> {
    const { specificationRepository } = this;

    const specificationAlreadyExists = await specificationRepository.findByName(name);

    if(specificationAlreadyExists) throw new AppError("Specification already exists");

    await specificationRepository.create({
      name,
      description
    })

  }
}

export { CreateSpecificationUseCase };