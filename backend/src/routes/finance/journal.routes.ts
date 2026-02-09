import { Router } from "express";
import { JournalController } from "../../controllers/finance/journal.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { requirePermission } from "../../middleware/requirePermission";

const router = Router();

router.use(requireAuth);

router.post(
  "/",
  requirePermission("JOURNAL_CREATE"),
  JournalController.create
);

export default router;
