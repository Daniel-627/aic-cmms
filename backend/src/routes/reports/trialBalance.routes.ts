import { Router } from "express";
import { trialBalanceController } from "../../controllers/reports/trialBalance.controller";

const router = Router();

router.get("/trial-balance", trialBalanceController);

export default router;
