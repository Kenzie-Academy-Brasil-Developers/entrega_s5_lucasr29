import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entity"
import { AppError } from "../../errors/AppError"

export const createCategoryService = async (categoryData) => {
    const categoryRepository = AppDataSource.getRepository(Categories)

    const exists = await categoryRepository.findOneBy({name: categoryData.name})

    if(exists){
        throw new AppError('category alredy exists', 409)
    }

    const category = categoryRepository.create(categoryData)

    const res = await categoryRepository.save(category)

    return res
}