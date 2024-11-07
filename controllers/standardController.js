const { getAllStandard, getStandardById, createStandard, updateStandard, deleteStandard } = require('../models/standardModel');
const Joi = require('joi');

// Input validation schema using Joi
const standardSchema = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().min(3).required()
});

// Get all standards
async function getStandards(req, res, next) {
    try {
        const standards = await getAllStandard();
        res.status(200).json(standards);
    } catch (error) {
        next(error);
    }
}

// Get a single standard by ID
async function getStandard(req, res, next) {
    try {
        const { id } = req.params;
        const standard = await getStandardById(id);
        if (!standard) {
            return res.status(404).json({ message: 'Standard not found' });
        }
        res.status(200).json(standard);
    } catch (error) {
        next(error);
    }
}

// Create a new standard
async function createNewStandard(req, res, next) {
    try {
        const { error } = standardSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const standardId = await createStandard(req.body);
        res.status(201).json({ message: 'Standard created', standardId });
    } catch (error) {
        next(error);
    }
}

// Update an existing standard
async function updateExistingStandard(req, res, next) {
    try {
        const { error } = standardSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { id } = req.params;
        await updateStandard(id, req.body);
        res.status(200).json({ message: 'Standard updated' });
    } catch (error) {
        next(error);
    }
}

// Delete a standard
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
