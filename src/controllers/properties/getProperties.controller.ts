import { Request, Response } from "express";
import { getPropertiesService } from "../../services/properties/getProperties.service";

export const getPropertiesController = async (request: Request, response: Response) => {

    const [data] = await getPropertiesService()

    return response.status(200).json(data)

}