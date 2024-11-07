const { getAllInstitutes, getInstituteById, createInstitute, updateInstitute, deleteInstitute } = require('../models/instituteModel');
const Joi = require('joi');

// Input validation schema using Joi
const instituteSchema = Joi.object({
    institute_name: Joi.string().min(3).required(),
    institute_phone: Joi.string().min(10).required(),
    institute_email: Joi.string().optional().allow(""),
    institute_website: Joi.string().optional().allow(""),
    isactive: Joi.number().integer().valid(0, 1).required(), // `isactive` should be 0 or 1
    api_key: Joi.string().optional().allow(""),
});

// Get all institutes
async function getInstitutes(req, res, next) {
    try {
        const institutes = await getAllInstitutes();
        res.status(200).json({ error: false, data: institutes });
    } catch (error) {
        res.status(500).json({ error: true, message: "Failed to fetch institutes", details: error.message });
        next(error);
    }
}

// Get a single institute by ID
async function getInstitute(req, res, next) {
    try {
        const { id } = req.params;
        const institute = await getInstituteById(id);
        if (!institute) {
            return res.status(404).json({ error: true, message: 'Institute not found' });
        }
        res.status(200).json({ error: false, data: institute });
    } catch (error) {
        res.status(500).json({ error: true, message: "Failed to fetch institute", details: error.message });
        next(error);
    }
}

// Create a new institute
async function createNewInstitute(req, res, next) {
    try {
        const { error } = instituteSchema.validate(req.body);
        if (error) {
            console.log("Validation Error:", error.details[0].message);
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const instituteId = await createInstitute(req.body);
        res.status(201).json({ error: false, message: 'Institute created', instituteId });
    } catch (error) {
        console.error("Error creating institute:", error.message);
        res.status(500).json({ error: true, message: "Internal Server Error", details: error.message });
    }
}

// Update an existing institute
async function updateExistingInstitute(req, res, next) {
    try {
        const { error } = instituteSchema.validate(req.body);
        if (error) return res.status(400).json({ error: true, message: error.details[0].message });

        const { id } = req.params;

        await updateInstitute(id, req.body);
        res.status(200).json({ error: false, message: 'Institute updated' });
    } catch (error) {
        console.error("Error updating institute:", error.message);
        res.status(500).json({ error: true, message: "Internal Server Error", details: error.message });
    }
}

// Delete an institute
async function removeInstitute(req, res, next) {
    try {
        const { id } = req.params;
        await deleteInstitute(id);
        res.status(200).json({ error: false, message: 'Institute deleted' });
    } catch (error) {
        res.status(500).json({ error: true, message: "Failed to delete institute", details: error.message });
        next(error);
    }
}

module.exports = { getInstitutes, getInstitute, createNewInstitute, updateExistingInstitute, removeInstitute };
