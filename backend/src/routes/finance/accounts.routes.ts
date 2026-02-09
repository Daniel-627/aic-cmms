import { Router } from "express";
import { AccountsController } from "../../controllers/finance/accounts.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { requirePermission } from "../../middleware/requirePermission";

const router = Router();

router.use(requireAuth);

router.post(
  "/",
  requirePermission("JOURNAL_CREATE"),
  AccountsController.create
);

router.get(
  "/",
  requirePermission("JOURNAL_VIEW"),
  AccountsController.list
);

router.patch(
  "/:id/deactivate",
  requirePermission("JOURNAL_CREATE"),
  AccountsController.deactivate
);

router.patch(
  "/:id/activate",
  requirePermission("JOURNAL_CREATE"),
  AccountsController.activate
);

export default router;
