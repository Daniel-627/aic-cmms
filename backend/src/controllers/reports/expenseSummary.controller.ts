import { Request, Response } from "express";
import { getExpenseSummary } from "../../services/reports/expenseSummary.service";

export async function expenseSummaryController(
  req: Request,
  res: Response
) {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      message: "from and to dates are required",
    });
  }

  const report = await getExpenseSummary(
    new Date(from as string),
    new Date(to as string)
  );

  res.json(report);
}
