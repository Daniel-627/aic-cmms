import { Request, Response } from "express";
import { getTrialBalance } from "../../services/reports/trialBalance.service";

export async function trialBalanceController(
  req: Request,
  res: Response
) {
  const { asOf } = req.query;

  if (!asOf) {
    return res.status(400).json({
      message: "asOf date is required",
    });
  }

  const report = await getTrialBalance(
    new Date(asOf as string)
  );

  res.json(report);
}
