import { Router } from "express";
import { balanceSheetController } from "../../controllers/reports/balanceSheet.controller";

const router = Router();

router.get("/balance-sheet", balanceSheetController);

export default router;
