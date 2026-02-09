import { Request, Response } from "express";
import { getBalanceSheet } from "../../services/reports/balanceSheet.service";

export async function balanceSheetController(
  req: Request,
  res: Response
) {
  const { asOf } = req.query;

  if (!asOf) {
    return res.status(400).json({
      message: "asOf date is required",
    });
  }

  const report = await getBalanceSheet(
    new Date(asOf as string)
  );

  res.json(report);
}
