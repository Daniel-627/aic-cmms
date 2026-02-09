import { Request, Response } from "express";
import { getIncomeStatement } from "../../services/reports/incomeStatement.service";

export async function incomeStatementController(
  req: Request,
  res: Response
) {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      message: "from and to dates are required",
    });
  }

  const report = await getIncomeStatement(
    new Date(from as string),
    new Date(to as string)
  );

  res.json(report);
}
