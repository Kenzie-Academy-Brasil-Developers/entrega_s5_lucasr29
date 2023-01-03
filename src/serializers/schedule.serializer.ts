import * as yup from 'yup'
import { SchemaOf } from "yup";
import { IScheduleRequest } from "../interfaces/schedules";

export const scheduleCreationSerializer: SchemaOf<IScheduleRequest> = yup.object().shape({
    hour: yup.string().required(),
    date: yup.string().required(),
    userId:yup.string().required(),
    propertyId:yup.string().required(),
})