const { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard } = require('../models/boardModel');
const Joi = require('joi');

// Input validation schema using Joi
const boardSchema = Joi.object({
    code: Joi.string().required(),
    board_name: Joi.string().required()
});

// Get all boards
async function getBoards(req, res, next) {
    console.log("Fetching all boards...");
    try {
        const boards = await getAllBoards();
        console.log("Boards fetched successfully:", boards);
        res.status(200).json({ error: false, data: boards });
    } catch (error) {
        console.error("Error fetching boards:", error.message);
        res.status(500).json({ error: true, message: "Failed to fetch boards" });
        next(error);
    }
}

// Get a single board by ID
async function getBoard(req, res, next) {
    const { id } = req.params;
    console.log(`Fetching board with ID: ${id}`);
    try {
        const board = await getBoardById(id);
        if (!board) {
            console.log("Board not found");
            return res.status(404).json({ error: true, message: 'Board not found' });
        }
        console.log("Board fetched successfully:", board);
        res.status(200).json({ error: false, data: board });
    } catch (error) {
        console.error(`Error fetching board with ID ${id}:`, error.message);
        res.status(500).json({ error: true, message: "Failed to fetch board" });
        next(error);
    }
}

// Create a new board
async function createNewBoard(req, res, next) {
    console.log("Creating a new board with data:", req.body);
    try {
        const { error } = boardSchema.validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const boardId = await createBoard(req.body);
        console.log("Board created successfully with ID:", boardId);
        res.status(201).json({ error: false, message: 'Board created', boardId });
    } catch (error) {
        console.error("Error creating board:", error.message);
        res.status(500).json({ error: true, message: "Failed to create board" });
        next(error);
    }
}

// Update an existing board
async function updateExistingBoard(req, res, next) {
    const { id } = req.params;
    console.log(`Updating board with ID: ${id} with data:`, req.body);
    try {
        const { error } = boardSchema.validate(req.body);
        if (error) {
            console.log("Validation error:", error.details[0].message);
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        await updateBoard(id, req.body);
        console.log(`Board with ID ${id} updated successfully`);
        res.status(200).json({ error: false, message: 'Board updated' });
    } catch (error) {
        console.error(`Error updating board with ID ${id}:`, error.message);
        res.status(500).json({ error: true, message: "Failed to update board" });
        next(error);
    }
}

// Delete a board
async function removeBoard(req, res, next) {
    const { id } = req.params;
    console.log(`Deleting board with ID: ${id}`);
    try {
        await deleteBoard(id);
        console.log(`Board with ID ${id} deleted successfully`);
        res.status(200).json({ error: false, message: 'Board deleted' });
    } catch (error) {
        console.error(`Error deleting board with ID ${id}:`, error.message);
        res.status(500).json({ error: true, message: "Failed to delete board" });
        next(error);
    }
}

module.exports = { getBoards, getBoard, createNewBoard, updateExistingBoard, removeBoard };
