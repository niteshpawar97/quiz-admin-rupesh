const express = require('express');
const { getBoards, getBoard, createNewBoard, updateExistingBoard, removeBoard } = require('../controllers/boardController');

const router = express.Router();

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 *     description: Retrieve a list of all boards
 *     responses:
 *       200:
 *         description: A list of boards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get('/', getBoards);
/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get a board by ID
 *     description: Retrieve a specific board using its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the board to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A board object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: Board not found
 */
router.get('/:id', getBoard);
/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     description: Add a new board to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Board created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 */
router.post('/', createNewBoard);
/**
 * @swagger
 * /boards/{id}:
 *   put:
 *     summary: Update an existing board
 *     description: Update a board using its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the board to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Board updated successfully
 *       404:
 *         description: Board not found
 */
router.put('/:id', updateExistingBoard);
/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: Delete a board
 *     description: Remove a specific board using its ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the board to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Board deleted successfully
 *       404:
 *         description: Board not found
 */
router.delete('/:id', removeBoard);

module.exports = router;