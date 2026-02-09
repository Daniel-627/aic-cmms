import { Request, Response } from "express";
import { AnnouncementService } from "../../services/content/announcements.service";

export class AnnouncementController {
  static async create(req: Request, res: Response) {
    const announcement = await AnnouncementService.create({
      ...req.body,
      userId: req.user!.id,
    });

    res.status(201).json(announcement);
  }

  static async publish(req: Request, res: Response) {

    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid sermon id" });
    }


    const announcement = await AnnouncementService.publish(
      id,
      req.user!.id
    );

    res.json(announcement);
  }
}
