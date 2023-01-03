import { Router } from "express"
import { listSchedulesByPropertyController } from "../controllers/schedules/listSchedulesByProperty.controller"
import { scheduleCreationController } from "../controllers/schedules/schedule.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { ensureDataIsValid } from "../middlewares/ensureDataIsValidy.middleware"
import { ensureUserIsAdm } from "../middlewares/ensureIsAdm.middleware"
import { scheduleCreationSerializer } from "../serializers/schedule.serializer"
import { createScheduleService } from "../services/schedules/schedules.service"

export const schedulesRoutes = Router()

schedulesRoutes.post('',authMiddleware, ensureDataIsValid(scheduleCreationSerializer), scheduleCreationController)

schedulesRoutes.get('/properties/:id', authMiddleware, ensureUserIsAdm, listSchedulesByPropertyController)