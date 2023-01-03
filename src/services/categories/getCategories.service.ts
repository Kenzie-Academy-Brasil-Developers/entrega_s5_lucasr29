import AppDataSource from "../../data-source"
import { Categories } from "../../entities/categories.entity"

export const getCategoriesService = async () => {
    const categories = await AppDataSource.createQueryBuilder()
    .select(['categories.id', 'categories.name'])
    .from(Categories, 'categories').getMany()

    return categories
}