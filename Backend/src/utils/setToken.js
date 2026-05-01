import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export function setToken(res,user){
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
    }, config.JWT_SECRET, { expiresIn: '7d' });

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      });
}