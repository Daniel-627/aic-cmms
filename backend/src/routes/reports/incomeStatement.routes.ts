import { Router } from "express";
import { incomeStatementController } from "../../controllers/reports/incomeStatement.controller";

const router = Router();

router.get("/income-statement", incomeStatementController);

export default router;
