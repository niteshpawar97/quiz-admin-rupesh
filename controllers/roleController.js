const { getAllRoles, getRoleById, createRole, updateRole, deleteRole } = require('../models/roleModel');
const Joi = require('joi');

// Input validation schema using Joi
const roleSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required()
});

// Get all roles
async function getRoles(req, res, next) {
    try {
        const roles = await getAllRoles();
        res.status(200).json(roles);
    } catch (error) {
        next(error);
    }
}

// Get a single role by ID
async function getRole(req, res, next) {
    try {
        const { id } = req.params;
        const role = await getRoleById(id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        next(error);
    }
}

// Create a new role
async function createNewRole(req, res, next) {
    try {
        const { error } = roleSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const roleId = await createRole(req.body);
        res.status(201).json({ message: 'Role created', roleId });
    } catch (error) {
        next(error);
    }
}

// Update an existing role
async function updateExistingRole(req, res, next) {
    try {
        const { error } = roleSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { id } = req.params;
        await updateRole(id, req.body);
        res.status(200).json({ message: 'Role updated' });
    } catch (error) {
        next(error);
    }
}

// Delete a role
async function removeRole(req, res, next) {
    try {
        const { id } = req.params;
        await deleteRole(id);
        res.status(200).json({ message: 'Role deleted' });
    } catch (error) {
        next(error);
    }
}

module.exports = { getRoles, getRole, createNewRole, updateExistingRole, removeRole };