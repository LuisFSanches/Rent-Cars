import fs from "fs";
import { parse as csvParse } from "csv-parse";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
  name: string;
  description: string
}
@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {};

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile.on("data", async (line) => {
        const [name, description] = line;
        categories.push({
          name,
          description
        })
      })
      .on("end", () => {
        resolve(categories);
      })
      .on("error", (error) => {
        reject(error)
      })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const { categoriesRepository, loadCategories } = this;

    const categories = await loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;
      const existsCategory = await categoriesRepository.findByName(name);

      if (!existsCategory) await categoriesRepository.create({ name, description });
    })
  }
}

export { ImportCategoryUseCase };