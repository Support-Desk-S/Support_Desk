import tenantModel from "../models/tenant.model.js";

/**
 * @param {Object} data={name, slug, supportEmail} - The tenant data to create
 * @returns {Promise<Object>} - The created tenant object
 */
export async function createTenant(data,session) {
    const tenant = await tenantModel.create([data], { session });
    return tenant[0];
}

/**
 * @param {String} id - The ID of the tenant to retrieve
 * @returns {Promise<Object>} - The tenant object if found, otherwise null
 */
export async function getTenantById(id) {
    const tenant = await tenantModel.findById(id);
    return tenant;
}

/**
 * @param {String} slug - The slug of the tenant to retrieve
 * @returns {Promise<Object>} - The tenant object if found, otherwise null
 */
export async function getTenantBySlug(slug) {
    const tenant = await tenantModel.findOne({ slug });
    return tenant;
}

/**
 * @returns {Promise<Array>} - An array of all tenant objects
 */
export async function getAllTenants() {
    const tenants = await tenantModel.find();
    return tenants;
}