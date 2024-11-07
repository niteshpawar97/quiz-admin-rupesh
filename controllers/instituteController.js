const { getAllInstitutes, getInstituteById, createInstitute, updateInstitute, deleteInstitute } = require('../models/instituteModel');
const Joi = require('joi');

// Input validation schema using Joi
const instituteSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required()
});

// Get all institutes
async function getInstitutes(req, res, next) {
    try {
        const institutes = await getAllInstitutes();
        res.status(200).json(institutes);
    } catch (error) {
        next(error);
    }
}

// Get a single institute by ID
async function getInstitute(req, res, next) {
    try {
        const { id } = req.params;
        const institute = await getInstituteById(id);
        if (!institute) {
            return res.status(404).json({ message: 'Institute not found' });
        }
        res.status(200).json(institute);
    } catch (error) {
        next(error);
    }
}

// Create a new institute
async function createNewInstitute(req, res, next) {
    try {
        const { error } = instituteSchema.validate(req.body);
        if (error) {
            console.log("Validation Error:", error.details[0].message);
            return res.status(400).json({ message: error.details[0].message });
        }

        const instituteId = await createInstitute(req.body);
        res.status(201).json({ message: 'Institute created', instituteId });
    } catch (error) {
        console.error("Error creating institute:", error.message);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


// Update an existing institute
async function updateExistingInstitute(req, res, next) {
    try {
        const { error } = instituteSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { id } = req.params;
        await updateInstitute(id, req.body);
        res.status(200).json({ message: 'Institute updated' });
    } catch (error) {
        next(error);
    }
}

// Delete a institute
async function removeInstitute(req, res, next) {
    try {
        const { id } = req.params;
        await deleteInstitute(id);
        res.status(200).json({ message: 'Institute deleted' });
    } catch (error) {
        next(error);
    }
}

module.exports = { getInstitutes, getInstitute, createNewInstitute, updateExistingInstitute, removeInstitute };