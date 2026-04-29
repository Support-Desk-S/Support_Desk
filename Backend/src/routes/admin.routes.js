import express from "express";
import * as adminController from "../controllers/admin.controller.js";
import {
  authMiddleware,
  isAdmin,
  tenantMiddleware,
} from "../middleware/auth.middleware.js";

import {
  approveUserValidation,
  updateRoleValidation,
} from "../validation/admin.validation.js";

const router = express.Router();

// Apply auth + admin check globally
router.use(authMiddleware, isAdmin);

/**
 * @route GET /api/admin/users
 */
router.get("/users", tenantMiddleware, adminController.getUsers);

/**
 * @route PATCH /api/admin/users/:userId/approve
 */
router.patch(
  "/users/:userId/approve",
  approveUserValidation,
  tenantMiddleware,
  adminController.approveUser
);

/**
 * @route PATCH /api/admin/users/:userId/role
 */
router.patch(
  "/users/:userId/role",
  updateRoleValidation,
  tenantMiddleware,
  adminController.updateUserRole
);

/**
 * @route GET /api/admin/stats
 */
router.get("/stats", tenantMiddleware, adminController.getStats);

export default router;