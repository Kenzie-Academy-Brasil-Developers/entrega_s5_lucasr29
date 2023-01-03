import AppDataSource from "../../data-source"
import { Properties } from "../../entities/properties.entity"
import { schedulesUserProperties } from "../../entities/schedulesUserProperties.entity"
import { User } from "../../entities/user.entity"
import { AppError } from "../../errors/AppError"
import {IScheduleRequest} from "../../interfaces/schedules/index"

export const createScheduleService = async (scheduleData: IScheduleRequest) => {

    const propertiesRepo = AppDataSource.getRepository(Properties)
    const userRepo = AppDataSource.getRepository(User)
    const scheduleRepo = AppDataSource.getRepository(schedulesUserProperties)
    
    const user = await userRepo.createQueryBuilder('users').where('users.id = :id', {id: scheduleData.userId}).getOne()
    
    const property = await propertiesRepo.createQueryBuilder('properties').where('properties.id = :id', {id: scheduleData.propertyId}).getOne()

    if(!property){
        throw new AppError('property not found', 404)
    }
    
    if(!user){
        throw new AppError('user not found', 404)
    }
    
    const separetedHour = scheduleData.hour.split(":")
    const hourMinutes = {
        hour: parseInt(separetedHour[0]),
        minutes: parseInt(separetedHour[1])
    }
    
    if(hourMinutes.hour < 8 || hourMinutes.hour >= 18 || hourMinutes.minutes < 0 || hourMinutes.minutes > 59){
        throw new AppError('please select a time slot from 08:00 to 18:00', 400)
    }
    const weekDay = new Date(scheduleData.date).getDay()
    if(weekDay > 5 || weekDay < 1){
        throw new AppError('schedules available only from monday - friday', 400)
    }

    const scheduleExistsInProperty = await AppDataSource.createQueryBuilder().
    select(["schedules"]).
    from(schedulesUserProperties, 'schedules').
    where("schedules.property = :id AND schedules.hour = :hour and schedules.date = :date", {id: scheduleData.propertyId, hour: scheduleData.hour, date:scheduleData.date}).
    getOne()

    if(scheduleExistsInProperty){
        throw new AppError('time already booked', 409)
    }

    const scheduleExistsInUser = await AppDataSource.createQueryBuilder()
    .select(["schedules"])
    .from(schedulesUserProperties, "schedules")
    .where("schedules.user = :user AND schedules.hour = :hour AND schedules.date = :date", {user:scheduleData.userId, hour: scheduleData.hour, date: scheduleData.date})
    .getOne()

    if(scheduleExistsInUser){
        throw new AppError('you already have an appointment at that time', 409)
    }

    const newSchedule = scheduleRepo.create({...scheduleData, user:user, property:property})

    const schedule = await scheduleRepo.save(newSchedule)

    return schedule
}