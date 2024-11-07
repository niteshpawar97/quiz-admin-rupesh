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
        const subjects = await getAllSubjects();
        res.status(200).json(subjects);
    } catch (error) {
        next(error);
    }
}

// Get a single subject by ID
async function getSubject(req, res, next) {
    try {
        const { id } = req.params;
        const subject = await getSubjectById(id);
        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.status(200).json(subject);
    } catch (error) {
        next(error);
    }
}

// Create a new subject
async function createNewSubject(req, res, next) {
    try {
        const { error } = subjectSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const subjectId = await createSubject(req.body);
        res.status(201).json({ message: 'Subject created', subjectId });
    } catch (error) {
        next(error);
    }
}

// Update an existing subject
async function updateExistingSubject(req, res, next) {
    try {
        const { error } = subjectSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { id } = req.params;
        await updateSubject(id, req.body);
        res.status(200).json({ message: 'Subject updated' });
    } catch (error) {
        next(error);
    }
}

// Delete a subject
async function removeSubject(req, res, next) {
    try {
        const { id } = req.params;
        await deleteSubject(id);
        res.status(200).json({ message: 'Subject deleted' });
    } catch (error) {
        next(error);
    }
}

module.exports = { getSubjects, getSubject, createNewSubject, updateExistingSubject, removeSubject };
