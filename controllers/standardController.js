const { getAllStandardes, getStandardById, createStandard, updateStandard, deleteStandard } = require('../models/standardModel');
const Joi = require('joi');

// Input validation schema using Joi
const roleSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required()
});

// Get all roles
async function getStandards(req, res, next) {
    try {
        const roles = await getAllStandardes();
        res.status(200).json(roles);
    } catch (error) {
        next(error);
    }
}

// Get a single role by ID
async function getStandard(req, res, next) {
    try {
        const { id } = req.params;
        const role = await getStandardById(id);
        if (!role) {
            return res.status(404).json({ message: 'Standard not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        next(error);
    }
}

// Create a new role
async function createNewStandard(req, res, next) {
    try {
        const { error } = roleSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const roleId = await createStandard(req.body);
        res.status(201).json({ message: 'Standard created', roleId });
    } catch (error) {
        next(error);
    }
}

// Update an existing role
async function updateExistingStandard(req, res, next) {
    try {
        const { error } = roleSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { id } = req.params;
        await updateStandard(id, req.body);
        res.status(200).json({ message: 'Standard updated' });
    } catch (error) {
        next(error);
    }
}

// Delete a role
async function removeStandard(req, res, next) {
    try {
        const { id } = req.params;
        await deleteStandard(id);
        res.status(200).json({ message: 'Standard deleted' });
    } catch (error) {
        next(error);
    }
}

module.exports = { getStandards, getStandard, createNewStandard, updateExistingStandard, removeStandard };