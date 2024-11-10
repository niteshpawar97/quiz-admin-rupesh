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
        res.status(200).json({ error: false, data: standards });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Failed to fetch standards' });
        next(error);
    }
}

// Get a single standard by ID
async function getStandard(req, res, next) {
    try {
        const { id } = req.params;
        const standard = await getStandardById(id);
        if (!standard) {
            return res.status(404).json({ error: true, message: 'Standard not found' });
        }
        res.status(200).json({ error: false, data: standard });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Failed to fetch standard' });
        next(error);
    }
}

// Create a new standard
async function createNewStandard(req, res, next) {
    try {
        const { error } = standardSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const standardId = await createStandard(req.body);
        res.status(201).json({ error: false, message: 'Standard created', standardId });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Failed to create standard' });
        next(error);
    }
}

// Update an existing standard
async function updateExistingStandard(req, res, next) {
    try {
        const { error } = standardSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const { id } = req.params;
        await updateStandard(id, req.body);
        res.status(200).json({ error: false, message: 'Standard updated' });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Failed to update standard' });
        next(error);
    }
}

// Delete a standard
async function removeStandard(req, res, next) {
    try {
        const { id } = req.params;
        await deleteStandard(id);
        res.status(200).json({ error: false, message: 'Standard deleted' });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Failed to delete standard' });
        next(error);
    }
}

module.exports = { getStandards, getStandard, createNewStandard, updateExistingStandard, removeStandard };
