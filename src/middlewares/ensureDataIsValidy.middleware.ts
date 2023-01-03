import { NextFunction, Request, Response } from "express"
import { AnySchema } from "yup"
import { AppError } from "../errors/AppError"
import { propertyCreationSerializer } from "../serializers/properties.serializers"
import { scheduleCreationSerializer } from "../serializers/schedule.serializer"
import { userUpdateSerializer } from "../serializers/user.serializers"

export const ensureDataIsValid = (schema: AnySchema) => async (request: Request, response: Response, next: NextFunction) => {
    const keys = Object.keys(request.body)
    
    if(schema == userUpdateSerializer && keys.includes('isAdm')){
        throw new AppError("can't update isAdm field", 401)
    }else if(schema == userUpdateSerializer && keys.includes('isActive')){
        throw new AppError("can't update isActive field", 401)
    }else if(schema == userUpdateSerializer && keys.includes('id')){
        throw new AppError("can't update id field", 401)
    }

    if(schema == propertyCreationSerializer && keys.includes('category')){
        request.body.categoryId = request.body.category
    }

    if(schema == scheduleCreationSerializer){
        request.body.userId = request.user.id
    }

    console.log(request.body)
    try {
        const validatedData = await schema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true
        })
        
        request.body = validatedData

        return next()
    } catch (error) {
        throw new AppError(error.errors, 400)
    }

}