import { Request, Response } from "express";
import { ListCategoriesUseCase } from "../listCategory/ListCategoriesUseCase";

class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoriesUseCase) {};
  
  handle(request: Request, response: Response) {

    const all = this.listCategoryUseCase.execute();

    return response.json(all);
  }
}

export { ListCategoriesController };