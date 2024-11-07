const { getAllMedium, getMediumById, createMedium, updateMedium, deleteMedium } = require('../models/mediumModel');
const Joi = require('joi');

// Input validation schema using Joi
const mediumSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required()
});

// Get all medium
async function getMediums(req, res, next) {
    try {
        const medium = await getAllMedium();
        res.status(200).json(medium);
    } catch (error) {
        next(error);
    }
}

// Get a single medium by ID
async function getMedium(req, res, next) {
    try {
        const { id } = req.params;
        const medium = await getMediumById(id);
        if (!medium) {
            return res.status(404).json({ message: 'Medium not found' });
        }
        res.status(200).json(medium);
    } catch (error) {
        next(error);
    }
}

// Create a new medium
async function createNewMedium(req, res, next) {
    try {
        const { error } = mediumSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const mediumId = await createMedium(req.body);
        res.status(201).json({ message: 'Medium created', mediumId });
    } catch (error) {
        next(error);
    }
}

// Update an existing medium
async function updateExistingMedium(req, res, next) {
    try {
        const { error } = mediumSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { id } = req.params;
        await updateMedium(id, req.body);
        res.status(200).json({ message: 'Medium updated' });
    } catch (error) {
        next(error);
    }
}

// Delete a medium
async function removeMedium(req, res, next) {
    try {
        const { id } = req.params;
        await deleteMedium(id);
        res.status(200).json({ message: 'Medium deleted' });
    } catch (error) {
        next(error);
    }
}

module.exports = { getMediums, getMedium, createNewMedium, updateExistingMedium, removeMedium };