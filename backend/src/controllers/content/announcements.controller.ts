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
    const announcement = await AnnouncementService.publish(
      req.params.id,
      req.user!.id
    );

    res.json(announcement);
  }
}
