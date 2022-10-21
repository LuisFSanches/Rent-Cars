import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./importCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  handle(request: Request, response: Response) {
    const { file } = request;
    const { importCategoryUseCase } = this;
    
    importCategoryUseCase.execute(file);

    return response.send();
  }
}

export { ImportCategoryController };