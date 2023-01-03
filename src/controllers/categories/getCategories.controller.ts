import { Request, Response } from "express";
import { getCategoriesService } from "../../services/categories/getCategories.service";

export const getCategoriesController = async (request: Request, response: Response) => {
    const data = await getCategoriesService()


    return response.status(200).json(data)
}