import { string } from "yup";
import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { schedulesUserProperties } from "../../entities/schedulesUserProperties.entity";
import { AppError } from "../../errors/AppError";

export const listSchedulesByPropertyService = async (propertyId: string) => {
    const propertyRepo = AppDataSource.getRepository(Properties)
    const scheduleRepo = AppDataSource.getRepository(schedulesUserProperties)

    const property = await propertyRepo.findOneBy({id: propertyId})

    if(!property){
        throw new AppError("property doesn't exists", 404)
    }

    const schedules = await scheduleRepo.find({where: {property: {id: propertyId}}, relations: {user:true}})

    const res = {schedules: schedules}

    return res
}