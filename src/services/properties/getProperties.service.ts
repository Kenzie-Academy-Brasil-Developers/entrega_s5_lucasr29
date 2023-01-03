import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"

export const getPropertiesService = async () => {
    const propertiesRepo = AppDataSource.getRepository(Properties)

    const properties = await propertiesRepo.find()

    return [properties]
}