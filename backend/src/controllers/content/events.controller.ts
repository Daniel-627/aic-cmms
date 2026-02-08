import { Request, Response } from "express";
import { EventService } from "../../services/content/events.service";

export class EventController {
  static async create(req: Request, res: Response) {
    const event = await EventService.create({
      ...req.body,
      userId: req.user!.id,
    });

    res.status(201).json(event);
  }

  static async publish(req: Request, res: Response) {
    const event = await EventService.publish(req.params.id, req.user!.id);
    res.json(event);
  }
}
