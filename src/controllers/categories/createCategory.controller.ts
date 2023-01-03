import { Request, request, Response } from "express";
import { createCategoryService } from "../../services/categories/createCategory.service";

export const createCategoryController = async (request: Request, response: Response) => {
    const data = await createCategoryService(request.body)

    return response.status(201).json(data)
}