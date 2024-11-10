const { getAllSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } = require('../models/subjectModel');
const Joi = require('joi');

// Input validation schema using Joi
const subjectSchema = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().min(3).required(),
    standard_id: Joi.number().integer().required(),
});

// Get all subjects
async function getSubjects(req, res, next) {
    try {
        console.log("Fetching all subjects");
        const subjects = await getAllSubjects();
        res.status(200).json({ error: false, data: subjects });
    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({ error: true, message: 'Failed to fetch subjects' });
        next(error);
    }
}

// Get a single subject by ID
async function getSubject(req, res, next) {
    try {
        const { id } = req.params;
        console.log(`Fetching subject with ID: ${id}`);
        const subject = await getSubjectById(id);
        if (!subject) {
            console.log("Subject not found");
            return res.status(404).json({ error: true, message: 'Subject not found' });
        }
        res.status(200).json({ error: false, data: subject });
    } catch (error) {
        console.error("Error fetching subject:", error);
        res.status(500).json({ error: true, message: 'Failed to fetch subject' });
        next(error);
    }
}

// Create a new subject
async function createNewSubject(req, res, next) {
    try {
        console.log("Creating new subject:", req.body);
        const { error } = subjectSchema.validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const subjectId = await createSubject(req.body);
        console.log("Subject created with ID:", subjectId);
        res.status(201).json({ error: false, message: 'Subject created', subjectId });
    } catch (error) {
        console.error("Error creating subject:", error);
        res.status(500).json({ error: true, message: 'Failed to create subject' });
        next(error);
    }
}

// Update an existing subject
async function updateExistingSubject(req, res, next) {
    try {
        const { id } = req.params;
        console.log(`Updating subject with ID: ${id}`, req.body);

        const { error } = subjectSchema.validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        await updateSubject(id, req.body);
        console.log("Subject updated with ID:", id);
        res.status(200).json({ error: false, message: 'Subject updated' });
    } catch (error) {
        console.error("Error updating subject:", error);
        res.status(500).json({ error: true, message: 'Failed to update subject' });
        next(error);
    }
}

// Delete a subject
async function removeSubject(req, res, next) {
    try {
        const { id } = req.params;
        console.log(`Deleting subject with ID: ${id}`);
        await deleteSubject(id);
        console.log("Subject deleted with ID:", id);
        res.status(200).json({ error: false, message: 'Subject deleted' });
    } catch (error) {
        console.error("Error deleting subject:", error);
        res.status(500).json({ error: true, message: 'Failed to delete subject' });
        next(error);
    }
}

module.exports = { getSubjects, getSubject, createNewSubject, updateExistingSubject, removeSubject };
