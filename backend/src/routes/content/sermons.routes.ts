import { Router } from "express";
import { SermonController } from "../../controllers/content/sermons.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { requirePermission } from "../../middleware/requirePermission";

export const sermonRoutes = Router();

sermonRoutes.post(
  "/",
  requireAuth,
  requirePermission("SERMON_CREATE"),
  SermonController.create
);

sermonRoutes.post(
  "/:id/submit",
  requireAuth,
  requirePermission("SERMON_CREATE"),
  SermonController.submit
);

sermonRoutes.post(
  "/:id/approve",
  requireAuth,
  requirePermission("SERMON_APPROVE"),
  SermonController.approve
);

sermonRoutes.post(
  "/:id/publish",
  requireAuth,
  requirePermission("SERMON_PUBLISH"),
  SermonController.publish
);
