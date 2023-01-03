import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Categories } from "../entities/categories.entity";
import { AppError } from "../errors/AppError";

export const categoryValidation = async (request: Request, response: Response, next: NextFunction) => {
    const categoryRepository = AppDataSource.getRepository(Categories)

    let category = await categoryRepository.findOneBy({id: request.params.id})

    if(!category){
        throw new AppError("category doesn't exists", 404)
    }
    
    return next()

}