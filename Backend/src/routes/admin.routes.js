import express from "express";
import * as adminController from "../controllers/admin.controller.js";
import { upload } from "../config/multer.js";
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

/**
 * @route POST /api/admin/tenant/context
 * @desc add tenant context for ai assistant
 */
router.post("/tenant/context", tenantMiddleware, upload.single("file"), adminController.addTenantContext);
export default router;