import { Router } from "express"
import { scheduleCreationController } from "../controllers/schedules/schedule.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import { ensureDataIsValid } from "../middlewares/ensureDataIsValidy.middleware"
import { scheduleCreationSerializer } from "../serializers/schedule.serializer"
import { createScheduleService } from "../services/schedules/schedules.service"

export const schedulesRoutes = Router()

schedulesRoutes.post('',authMiddleware, ensureDataIsValid(scheduleCreationSerializer), scheduleCreationController)

schedulesRoutes.get('/properties/:id', )