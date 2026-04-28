import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { tenantOnboardingValidation } from "../validation/auth.validation.js";
const router = Router();

/**
 * @route POST /api/auth/tenant/register
 * @desc Register a new tenant along with an admin user
 * @access Public
 * @body { name, slug, supportEmail, adminName, adminEmail, password }
 * @returns {Object} - The created tenant and admin user details
 */
router.post("/tenant/register", tenantOnboardingValidation, authController.registerTenant);


export default router;