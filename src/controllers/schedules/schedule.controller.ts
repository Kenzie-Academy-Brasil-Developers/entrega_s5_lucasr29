import { Request, Response } from "express";
import { createScheduleService } from "../../services/schedules/schedules.service";

export const scheduleCreationController = async (request: Request, response: Response) => {
    const data = await createScheduleService(request.body)

    return response.status(201).json(data)
}