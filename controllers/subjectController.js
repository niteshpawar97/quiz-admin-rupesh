const { getAllSubjects, getSubjectById, createSubject, updateSubject, deleteSubject } = require('../models/roleModel');
const Joi = require('joi');

// Input validation schema using Joi
const roleSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required()
});

// Get all roles
async function getSubjects(req, res, next) {
    try {
        const roles = await getAllSubjects();
        res.status(200).json(roles);
    } catch (error) {
        next(error);
    }
}

// Get a single role by ID
async function getSubject(req, res, next) {
    try {
        const { id } = req.params;
        const role = await getSubjectById(id);
        if (!role) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        next(error);
    }
}

// Create a new role
async function createNewSubject(req, res, next) {
    try {
        const { error } = roleSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const roleId = await createSubject(req.body);
        res.status(201).json({ message: 'Subject created', roleId });
    } catch (error) {
        next(error);
    }
}

// Update an existing role
async function updateExistingSubject(req, res, next) {
    try {
        const { error } = roleSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { id } = req.params;
        await updateSubject(id, req.body);
        res.status(200).json({ message: 'Subject updated' });
    } catch (error) {
        next(error);
    }
}

// Delete a role
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