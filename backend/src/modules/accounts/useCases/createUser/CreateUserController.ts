import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserCase } from "./CreateUserCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, username, email, password, driver_license } = request.body;

    const createUserCase = container.resolve(CreateUserCase);

    await createUserCase.execute({
      name, 
      username, 
      email, 
      password, 
      driver_license
    });

    return response.status(201).json({ data: createUserCase });
  }
}

export { CreateUserController };