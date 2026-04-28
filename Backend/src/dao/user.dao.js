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
    const user = await userModel.findOne({ email });
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