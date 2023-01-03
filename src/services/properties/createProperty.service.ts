import AppDataSource from "../../data-source"
import { Address } from "../../entities/addresses.entity"
import { Categories } from "../../entities/categories.entity"
import { Properties } from "../../entities/properties.entity"
import { AppError } from "../../errors/AppError"
import { IPropertyRequest } from "../../interfaces/properties"

export const createPropertyService = async (propertyData: IPropertyRequest) => {
    const propertyRepository = AppDataSource.getRepository(Properties)
    const addressRepository = AppDataSource.getRepository(Address)
    const categoryRepository = AppDataSource.getRepository(Categories)

    let category = await categoryRepository.findOneBy({name: propertyData.categoryId})

    if(!category){
        category = await categoryRepository.findOneBy({id: propertyData.categoryId})
    }


    if(!category){
        throw new AppError("category doesn't exists", 404)
    }

    const newAddress = addressRepository.create(propertyData.address)

    propertyData.address = newAddress
    
    await addressRepository.save(newAddress)
    
    const teste = await propertyRepository.save({...propertyData, address: newAddress, category: category})
    
    return [teste]
}