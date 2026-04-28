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


export const registerUser = async (data) => {
    const { name, email, password, tenantId } = data;

    const existingUser = await userDAO.getUserByEmail(email);
    if (existingUser) {
        throw new AppError("Email already in use. Please choose a different email.", 400);
    }

    const user = await userDAO.createUser({
        name,
        email,
        password,
        tenantId,
        role: "agent",
    });
    return user;
}

export const loginUser = async (email, password) => {
    const user = await userDAO.getUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new AppError("Invalid email or password", 401);
    }

    return user;
}