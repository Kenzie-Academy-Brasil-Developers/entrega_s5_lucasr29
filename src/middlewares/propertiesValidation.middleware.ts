import { NextFunction, Request, Response } from "express";
import AppDataSource from "../data-source";
import { Address } from "../entities/addresses.entity";
import { AppError } from "../errors/AppError";

export const validateProperty = async (request: Request, response: Response, next: NextFunction) => {
    const addressRepo = AppDataSource.getRepository(Address)

    const zipCode = request.body.address.zipCode
    const number = request.body.address.number

    const exists = await addressRepo.createQueryBuilder("addresses").
    select("addresses.id").
    where('addresses.zipCode = :zipCode', {zipCode:zipCode}).
    andWhere('addresses.number = :number', {number:number}).
    getOne()

    if(exists){
        throw new AppError('property already registered', 409)
    }

    return next()
}