import { Request, Response } from "express";
import { JournalService } from "../../services/finance/journal.service";

export class JournalController {
  static async create(req: Request, res: Response) {
    const entry = await JournalService.createEntry({
      ...req.body,
      createdBy: req.user!.id,
    });

    res.status(201).json(entry);
  }
}
