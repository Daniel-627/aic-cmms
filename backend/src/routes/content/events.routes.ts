import { Router } from "express";
import { EventController } from "../../controllers/content/events.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { requirePermission } from "../../middleware/requirePermission";

export const eventRoutes = Router();

eventRoutes.post(
  "/",
  requireAuth,
  requirePermission("EVENT_CREATE"),
  EventController.create
);

eventRoutes.post(
  "/:id/publish",
  requireAuth,
  requirePermission("EVENT_PUBLISH"),
  EventController.publish
);
