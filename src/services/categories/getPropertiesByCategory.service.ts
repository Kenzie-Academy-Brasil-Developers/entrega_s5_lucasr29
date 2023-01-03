import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entity"

export const getPropertiesByCategoryService = async (categoryId: string) => {
     const categoryRepo = AppDataSource.getRepository(Categories)

     const properties = await categoryRepo.findOne({
          where: {id: categoryId},
          relations: {properties: true},
     });

     return [properties]
}