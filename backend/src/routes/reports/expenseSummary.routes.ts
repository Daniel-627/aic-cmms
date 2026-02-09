import { Router } from "express";
import { expenseSummaryController } from "../../controllers/reports/expenseSummary.controller";

const router = Router();

router.get("/expense-summary", expenseSummaryController);

export default router;
