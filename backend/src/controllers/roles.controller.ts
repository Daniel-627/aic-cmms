import { Request, Response } from "express";
import { RolesService } from "../services/roles.service";

export class RolesController {
  static async assignRole(req: Request, res: Response) {
    const userId = Array.isArray(req.body.userId) ? req.body.userId[0] : req.body.userId;
    const role = Array.isArray(req.body.role) ? req.body.role[0] : req.body.role;

    if (!userId || !role) {
      return res.status(400).json({ message: "userId and role are required" });
    }

    try {
      const assigned = await RolesService.assignRole(userId, role, req.user!.id);
      res.status(201).json(assigned);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getUserRoles(req: Request, res: Response) {
    const userId = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    try {
      const roles = await RolesService.getUserRoles(userId);
      res.json(roles);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateRoleStatus(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const status = Array.isArray(req.body.status) ? req.body.status[0] : req.body.status;

    if (!id || !status) {
      return res.status(400).json({ message: "id and status are required" });
    }

    try {
      const updated = await RolesService.updateRoleStatus(id, status);
      res.json(updated);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async removeRole(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!id) {
      return res.status(400).json({ message: "id is required" });
    }

    try {
      await RolesService.removeRole(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
