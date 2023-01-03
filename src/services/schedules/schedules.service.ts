import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { schedulesUserProperties } from "../../entities/schedulesUserProperties.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/AppError"
import {IScheduleRequest} from "../../interfaces/schedules/index"

export const createScheduleService = async (scheduleData: IScheduleRequest) => {
    const scheduleExists = await AppDataSource.createQueryBuilder().
    select('schedules_user_properties.id').
    from(schedulesUserProperties, 'schedules_user_properties').
    where('schedules_user_properties.time = :time', {time: scheduleData.time}).
    andWhere('schedules_user_properties.date = :date', {date: scheduleData.date}).
    getOne()

    if(scheduleExists){
        throw new AppError('alredy reserved', 409)
    }

    const propertiesRepo = AppDataSource.getRepository(Properties)
    const userRepo = AppDataSource.getRepository(User)
    const scheduleRepo = AppDataSource.getRepository(schedulesUserProperties)

    const user = await userRepo.createQueryBuilder('users').where('users.id = :id', {id: scheduleData.userId}).getOne()
    console.log(user)
    const property = await propertiesRepo.createQueryBuilder('properties').where('properties.id = :id', {id:scheduleData.propertyId}).getOne()
    console.log(property)
    const schedule = await scheduleRepo.save({...scheduleData, userId:user, propertyId:property})

    console.log(user)

    return schedule
}