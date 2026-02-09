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

    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid event id" });
    }


    const event = await EventService.publish(id, req.user!.id);
    res.json(event);
  }
}
