import { Router } from "express";
import { RemittanceController } from "../../controllers/reports/remittance.controller";

const router = Router();

router.get("/remittance-summary", RemittanceController.get);

export default router;
