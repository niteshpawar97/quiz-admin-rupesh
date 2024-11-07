const { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard } = require('../models/boardModel');
const Joi = require('joi');

// Input validation schema using Joi
const roleSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required()
});

// Get all roles
async function getBoards(req, res, next) {
    try {
        const roles = await getAllBoards();
        res.status(200).json(roles);
    } catch (error) {
        next(error);
    }
}

// Get a single role by ID
async function getBoard(req, res, next) {
    try {
        const { id } = req.params;
        const role = await getBoardById(id);
        if (!role) {
            return res.status(404).json({ message: 'Board not found' });
        }
        res.status(200).json(role);
    } catch (error) {
        next(error);
    }
}

// Create a new role
async function createNewBoard(req, res, next) {
    try {
        const { error } = roleSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const roleId = await createBoard(req.body);
        res.status(201).json({ message: 'Board created', roleId });
    } catch (error) {
        next(error);
    }
}

// Update an existing role
async function updateExistingBoard(req, res, next) {
    try {
        const { error } = roleSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const { id } = req.params;
        await updateBoard(id, req.body);
        res.status(200).json({ message: 'Board updated' });
    } catch (error) {
        next(error);
    }
}

// Delete a role
async function removeBoard(req, res, next) {
    try {
        const { id } = req.params;
        await deleteBoard(id);
        res.status(200).json({ message: 'Board deleted' });
    } catch (error) {
        next(error);
    }
}

module.exports = { getBoards, getBoard, createNewBoard, updateExistingBoard, removeBoard };