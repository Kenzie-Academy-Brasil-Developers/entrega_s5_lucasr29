import { Request, Response } from "express";
import { getPropertiesByCategoryService } from "../../services/categories/getPropertiesByCategory.service";

export const getPropertiesByCategoryController = async (request: Request, response: Response) => {
    const [data] = await getPropertiesByCategoryService(request.params.id)

    return response.status(200).json(data)
}