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