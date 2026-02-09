import { Request, Response } from "express";
import { getAccountBalances } from "../../services/reports/accountBalances.service";

export async function accountBalancesController(
  req: Request,
  res: Response
) {
  const { asOf } = req.query;

  if (!asOf) {
    return res.status(400).json({
      message: "asOf date is required",
    });
  }

  const report = await getAccountBalances(
    new Date(asOf as string)
  );

  res.json(report);
}
