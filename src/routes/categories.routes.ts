import { Router } from "express";
import { createCategoryController } from "../controllers/categories/createCategory.controller";
import { getCategoriesController } from "../controllers/categories/getCategories.controller";
import { getPropertiesByCategoryController } from "../controllers/categories/getPropertiesByCategory.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { categoryValidation } from "../middlewares/categoryValidation.middleware";
import { ensureUserIsAdm } from "../middlewares/ensureIsAdm.middleware";

export const categoriesRoutes = Router()

categoriesRoutes.get('', getCategoriesController)

categoriesRoutes.get('/:id/properties',categoryValidation, getPropertiesByCategoryController)

categoriesRoutes.post('',authMiddleware, ensureUserIsAdm, createCategoryController)
