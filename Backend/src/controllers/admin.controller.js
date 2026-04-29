import * as adminService from "../service/admin.service.js";

export const getUsers = async (req, res, next) => {
  try {
    const { tenantId } = req.user;

    const users = await adminService.getUsers(tenantId);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const approveUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { isApproved } = req.body;
    const { tenantId } = req.user;

    const user = await adminService.approveUser(
      userId,
      isApproved,
      tenantId
    );

    res.status(200).json({
      success: true,
      message: "User approval updated",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    const { tenantId, id: adminId } = req.user;

    const user = await adminService.updateUserRole(
      userId,
      role,
      tenantId,
      adminId
    );

    res.status(200).json({
      success: true,
      message: "User role updated",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const getStats = async (req, res, next) => {
  try {
    const { tenantId } = req.user;

    const stats = await adminService.getStats(tenantId);

    res.status(200).json({
      success: true,
      message: "Stats fetched successfully",
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};
