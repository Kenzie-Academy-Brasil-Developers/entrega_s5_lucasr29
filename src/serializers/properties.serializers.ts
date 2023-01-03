import * as yup from 'yup'
import { SchemaOf } from "yup";
import {IPropertyRequest} from "../interfaces/properties"
import {IAddressRequest} from "../interfaces/properties"

export const propertyCreationSerializer: SchemaOf<IPropertyRequest> = yup.object().shape({
    value: yup.number().required(),
    size: yup.number().required(),
    address: yup.object().shape({
        district: yup.string().required(),
        zipCode: yup.string().max(8).min(8).required(),
        number: yup.string(),
        city: yup.string().required(),
        state: yup.string().max(2).min(2).required()     
    }),
    categoryId: yup.string().required()
})
