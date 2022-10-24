import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesUseCase } from "../listCategory/ListCategoriesUseCase";

class ListCategoriesController {

  
  handle(request: Request, response: Response) {
    const listCategoryUseCase = container.resolve(ListCategoriesUseCase);
    const all = listCategoryUseCase.execute();

    return response.json(all);
  }
}

export { ListCategoriesController };