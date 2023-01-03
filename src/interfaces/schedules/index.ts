import { IUser } from "../users"

export interface IScheduleRequest {
    userId: string
    propertyId: string
    date: string
    hour: string
}

export interface IScheduleReturn{
    id: string
    date: string
    hour: string
    user: IUser
}