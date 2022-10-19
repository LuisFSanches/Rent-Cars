import { ISpecificationsRepository } from "../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationService {

  constructor(private specificationRepository: ISpecificationsRepository) {}
  
  execute({ description, name }: IRequest): void {
    const { specificationRepository } = this;

    const specificationAlreadyExists = specificationRepository.findByName(name);

    if(specificationAlreadyExists) throw new Error("Specification already exists");

    specificationRepository.create({
      name,
      description
    })

  }
}

export { CreateSpecificationService };