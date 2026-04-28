import * as tenantDAO from "../dao/tenant.dao.js";
import * as userDAO from "../dao/user.dao.js";
import mongoose from "mongoose";
import AppError from "../utils/appError.js";

export const registerTenantWithAdmin = async (data) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const { name, slug, supportEmail, adminName, adminEmail, password } = data;

        const existingTenant = await tenantDAO.getTenantBySlug(slug);
        if (existingTenant) {
            throw new AppError("Slug already exists. Please choose a different slug.", 400);
        }

        const existingUser = await userDAO.getUserByEmail(adminEmail);
        if (existingUser) {
            throw new AppError("Email already in use. Please choose a different email.", 400);
        }

        // 1. Create Tenant
        const tenant = await tenantDAO.createTenant(
        { name, slug, supportEmail },
        session
        );

        // 2. Create Admin User
        const adminUser = await userDAO.createUser(
        {
            name: adminName,
            email: adminEmail,
            password,
            role: "admin",
            tenantId: tenant._id,
        },
        session
        );

        await session.commitTransaction();
        session.endSession();

        return {
            tenant,
            adminUser,
        };

    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        throw error;
    }
};
