import * as authService from "../service/auth.service.js";
import { setToken } from "../utils/setToken.js";
import AppError from "../utils/appError.js";

export const registerTenant = async (req, res) => {
    try {
        const result = await authService.registerTenantWithAdmin(req.body);

        setToken(res,result.adminUser);

        return res.status(201).json({
            success: true,
            message: "Tenant and admin created successfully",
            data: result,
        });

    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                success: false,
                message: err.message,
            });
        }
        console.error("Error in registerTenant:", err);
        return res.status(500).json({
            success: false,
            message: "server error",
        });
    }
};