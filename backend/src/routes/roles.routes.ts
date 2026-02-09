import { Router } from "express";
import { RolesController } from "../controllers/roles.controller";
import { requireAuth } from "../middleware/requireAuth";
import { requireRole } from "../middleware/requireRole";
import { ROLES } from "../constants/roles";

export const rolesRouter = Router();

// All routes require authentication
rolesRouter.use(requireAuth);

// Only ADMIN can assign roles
rolesRouter.post(
  "/assign",
  requireRole([ROLES.ADMIN]),
  RolesController.assignRole
);

rolesRouter.get(
  "/user/:userId",
  requireRole([ROLES.ADMIN]),
  RolesController.getUserRoles
);

rolesRouter.patch(
  "/update/:id",
  requireRole([ROLES.ADMIN]),
  RolesController.updateRoleStatus
);

rolesRouter.delete(
  "/remove/:id",
  requireRole([ROLES.ADMIN]),
  RolesController.removeRole
);
