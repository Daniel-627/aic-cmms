import { Router } from "express";
import { AnnouncementController } from "../../controllers/content/announcements.controller";
import { requireAuth } from "../../middleware/requireAuth";
import { requirePermission } from "../../middleware/requirePermission";

export const announcementRoutes = Router();

announcementRoutes.post(
  "/",
  requireAuth,
  requirePermission("ANNOUNCEMENT_CREATE"),
  AnnouncementController.create
);

announcementRoutes.post(
  "/:id/publish",
  requireAuth,
  requirePermission("ANNOUNCEMENT_PUBLISH"),
  AnnouncementController.publish
);
