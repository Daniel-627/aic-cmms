import { Request, Response, NextFunction } from "express";
import { PERMISSIONS, Permission } from "../constants/permissions";
import { Role } from "../constants/roles";

/**
 * Require a permission (resolved via role matrix)
 */
export function requirePermission(permission: Permission) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const allowedRoles: readonly Role[] = PERMISSIONS[permission];
    const userRoles: Role[] = req.user.roles ?? [];

    const hasPermission = userRoles.some((role) =>
      allowedRoles.includes(role)
    );

    if (!hasPermission) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
}
