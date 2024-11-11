const { getAllMedium, getMediumById, createMedium, updateMedium, deleteMedium } = require('../models/mediumModel');
const Joi = require('joi');

// Input validation schema using Joi
const mediumSchema = Joi.object({
    medium_code: Joi.string().min(3).required(), // Medium code with a minimum length of 3
    medium_name: Joi.string().min(3).required()  // Medium name with a minimum length of 3
});

// Get all mediums
async function getMediums(req, res, next) {
    try {
        const mediums = await getAllMedium();
        console.log("Fetched mediums:", mediums);
        res.status(200).json({ error: false, data: mediums });
    } catch (error) {
        console.error("Error fetching mediums:", error);
        res.status(500).json({ error: true, message: 'Failed to fetch mediums' });
        next(error);
    }
}

// Get a single medium by ID
async function getMedium(req, res, next) {
    try {
        const { id } = req.params;
        const medium = await getMediumById(id);
        console.log("Fetched medium:", medium);
        
        if (!medium) {
            return res.status(404).json({ error: true, message: 'Medium not found' });
        }
        res.status(200).json({ error: false, data: medium });
    } catch (error) {
        console.error("Error fetching medium by ID:", error);
        res.status(500).json({ error: true, message: 'Failed to fetch medium' });
        next(error);
    }
}

// Create a new medium
async function createNewMedium(req, res, next) {
    try {
        const { error } = mediumSchema.validate(req.body);
        if (error) {
            console.error("Validation error:", error.details[0].message);
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const mediumId = await createMedium(req.body);
        console.log("Created medium with ID:", mediumId);
        res.status(201).json({ error: false, message: 'Medium created', mediumId });
    } catch (error) {
        console.error("Error creating medium:", error);
        res.status(500).json({ error: true, message: 'Failed to create medium' });
        next(error);
    }
}

// Update an existing medium
async function updateExistingMedium(req, res, next) {
    try {
        const { error } = mediumSchema.validate(req.body);
        if (error) {
            console.error("Validation error:", error.details[0].message);
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const { id } = req.params;
        await updateMedium(id, req.body);
        console.log("Updated medium with ID:", id);
        res.status(200).json({ error: false, message: 'Medium updated' });
    } catch (error) {
        console.error("Error updating medium:", error);
        res.status(500).json({ error: true, message: 'Failed to update medium' });
        next(error);
    }
}

// Delete a medium
async function removeMedium(req, res, next) {
    try {
        const { id } = req.params;
        await deleteMedium(id);
        console.log("Deleted medium with ID:", id);
        res.status(200).json({ error: false, message: 'Medium deleted' });
    } catch (error) {
        console.error("Error deleting medium:", error);
        res.status(500).json({ error: true, message: 'Failed to delete medium' });
        next(error);
    }
}

module.exports = { getMediums, getMedium, createNewMedium, updateExistingMedium, removeMedium };
