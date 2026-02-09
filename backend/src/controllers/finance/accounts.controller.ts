import { Request, Response } from "express";
import { AccountsService } from "../../services/finance/accounts.service";

export class AccountsController {
  static async create(req: Request, res: Response) {
    const account = await AccountsService.create({
      ...req.body,
      createdBy: req.user!.id,
    });

    res.status(201).json(account);
  }

  static async list(req: Request, res: Response) {
    const accounts = await AccountsService.list();
    res.json(accounts);
  }

  static async deactivate(req: Request, res: Response) {

    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid sermon id" });
    }

    const account = await AccountsService.setActive(
      id,
      false,
      req.user!.id
    );

    res.json(account);
  }

  static async activate(req: Request, res: Response) {

    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid sermon id" });
    }

    const account = await AccountsService.setActive(
      id,
      true,
      req.user!.id
    );

    res.json(account);
  }
}
