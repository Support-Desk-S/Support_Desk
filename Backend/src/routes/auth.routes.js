import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { tenantOnboardingValidation, registerValidation , loginValidation } from "../validation/auth.validation.js";
const router = Router();

/**
 * @route POST /api/auth/tenant/register
 * @desc Register a new tenant along with an admin user
 * @access Public
 * @body { name, slug, supportEmail, adminName, adminEmail, password }
 * @returns {Object} - The created tenant and admin user details
 */
router.post("/tenant/register", tenantOnboardingValidation, authController.registerTenant);

/**
 * @route POST /api/auth/register
 * @desc Register a new user under an existing tenant
 * @access Public
 * @body { name, email, password, tenantId }
 * @returns {Object} - The created user details and jwt token
 */
router.post("/register", registerValidation, authController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user and return a JWT token
 * @access Public
 * @body { email, password }
 * @returns {Object} - The logged in user details and JWT token
 */
router.post("/login", loginValidation, authController.loginUser);

export default router;