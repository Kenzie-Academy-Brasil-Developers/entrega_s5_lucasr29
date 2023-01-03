import { Request, Response } from "express";
import { listSchedulesByPropertyService } from "../../services/schedules/listAllSchedulesByPropertie.service";

export const listSchedulesByPropertyController = async (request: Request, response: Response) => {
    const data =  await listSchedulesByPropertyService(request.params.id)

    return response.status(200).json(data)
}