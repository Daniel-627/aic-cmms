import { Request, Response } from "express";
import { SermonService } from "../../services/content/sermons.service";

export class SermonController {
  static async create(req: Request, res: Response) {
    const sermon = await SermonService.create({
      ...req.body,
      authorId: req.user!.id,
    });

    res.status(201).json(sermon);
  }

  static async submit(req: Request, res: Response) {
    const sermon = await SermonService.submitForApproval(
      req.params.id,
      req.user!.id
    );

    res.json(sermon);
  }

  static async approve(req: Request, res: Response) {
    const sermon = await SermonService.approve(
      req.params.id,
      req.user!.id
    );

    res.json(sermon);
  }

  static async publish(req: Request, res: Response) {
    const sermon = await SermonService.publish(
      req.params.id,
      req.user!.id
    );

    res.json(sermon);
  }
}
