import { Request, Response } from "express";
import { getRemittanceSummary } from "../../services/reports/remittance.service";

export class RemittanceController {
  static async get(req: Request, res: Response) {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        message: "from and to dates are required",
      });
    }

    const report = await getRemittanceSummary(
      new Date(from as string),
      new Date(to as string)
    );

    res.json(report);
  }
}
