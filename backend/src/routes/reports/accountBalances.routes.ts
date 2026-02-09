import { Router } from "express";
import { accountBalancesController } from "../../controllers/reports/accountBalances.controller";

const router = Router();

router.get("/account-balances", accountBalancesController);

export default router;
