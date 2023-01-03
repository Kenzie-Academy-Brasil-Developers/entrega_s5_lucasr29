import { Request, response, Response } from "express";
import { createPropertyService } from "../../services/properties/createProperty.service";

export const createPropertyController = async (req: Request, res:Response) => {
    const [data] = await createPropertyService(req.body)

    return res.status(201).json(data)
}