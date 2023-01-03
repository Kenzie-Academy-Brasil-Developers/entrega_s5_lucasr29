import * as yup from 'yup'
import { SchemaOf } from "yup";
import { IScheduleRequest, IScheduleReturn } from "../interfaces/schedules";
import { userWithoutPasswordSerializer } from './user.serializers';

export const scheduleCreationSerializer: SchemaOf<IScheduleRequest> = yup.object().shape({
    hour: yup.string().required(),
    date: yup.string().required(),
    userId: yup.string().required(),
    propertyId: yup.string().required(),
})

export const scheduleResSerializer: SchemaOf<IScheduleReturn> = yup.object().shape({
    user: userWithoutPasswordSerializer,
    hour: yup.string(),
    date: yup.string(),
    id: yup.string()
})

export const scheduleResArraySerializer = yup.object().shape({
    schedules: yup.array(scheduleResSerializer)
})