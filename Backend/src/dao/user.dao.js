import userModel from "../models/user.model.js";

/**
 * @param {Object} data={name, email, password, role, tenantId} - The user data to create
 * @returns {Promise<Object>} - The created user object
*/
export async function createUser(data,session = null) {
    const options = session ? { session } : {};

    const user = await userModel.create([data], options);

    return user[0];
}

/**
 * @param {String} email - The email of the user to retrieve
 * @returns {Promise<Object>} - The user object if found, otherwise null
 */
export async function getUserByEmail(email) {
    const user = await userModel.findOne({ email }).select("+password");
    return user;
}

/**
 * @param {String} id - The ID of the user to retrieve
 * @returns {Promise<Object>} - The user object if found, otherwise null
 */
export async function getUserById(id) {
    const user = await userModel.findById(id);
    return user;
}

/**
 * @param {String} tenantId - The ID of the tenant to retrieve users for
 * @returns {Promise<Array>} - An array of user objects belonging to the specified tenant
 */
export async function getAllUsersByTenantId(tenantId) {
    const users = await userModel.find({ tenantId });
    return users;
}

/**
 * @param {String} slug - The slug of the tenant to retrieve users for
 * @returns {Promise<Array>} - An array of user objects belonging to the specified tenant slug
 */
export async function getAllUsersBySlug(slug) {
    const users = await userModel.find({ slug });
    return users;
}


/**
 * Fetch all users belonging to a specific tenant
 *
 * @param {string} tenantId - MongoDB ObjectId of the tenant
 * @returns {Promise<Array>} List of users excluding password field
 *
 * @description
 * - Used by admin to list all users in their tenant
 * - Ensures multi-tenant isolation by filtering with tenantId
 * - Excludes password for security reasons
 */
export const getUsersByTenant = async (tenantId) => {
    return await User
      .find({ tenantId })          // 🔒 Restrict to tenant users only
      .select("-password");        // ❌ Never expose password
  };
  
  
  /**
   * Fetch a single user by userId within a specific tenant
   *
   * @param {string} userId - MongoDB ObjectId of the user
   * @param {string} tenantId - MongoDB ObjectId of the tenant
   * @returns {Promise<Object|null>} User object if found, else null
   *
   * @description
   * - Used in admin operations like approve, role update
   * - Prevents cross-tenant access by checking both _id and tenantId
   * - Critical for security in multi-tenant systems
   */
  export const getUserByIdAndTenant = async (userId, tenantId) => {
    return await User.findOne({
      _id: userId,         // 🎯 Target specific user
      tenantId,            // 🔒 Ensure same tenant
    });
  };