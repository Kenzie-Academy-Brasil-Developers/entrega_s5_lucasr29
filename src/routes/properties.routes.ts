import { Router } from "express";
import { getPropertiesController } from "../controllers/properties/getProperties.controller";
import { createPropertyController } from "../controllers/properties/properties.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValidy.middleware";
import { ensureUserIsAdm } from "../middlewares/ensureIsAdm.middleware";
import { validateProperty } from "../middlewares/propertiesValidation.middleware";
import { propertyCreationSerializer } from "../serializers/properties.serializers";

export const propertiesRoutes = Router()

propertiesRoutes.post('',authMiddleware, ensureUserIsAdm,ensureDataIsValid(propertyCreationSerializer), validateProperty,  createPropertyController)


propertiesRoutes.get('', getPropertiesController)