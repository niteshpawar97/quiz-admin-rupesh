const express = require('express');
const { getStandards, getStandard, createNewStandard, updateExistingStandard, removeStandard } = require('../controllers/standardController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Standard
 *   description: API to manage standard
 */

/**
 * @swagger
 * /standard:
 *   get:
 *     tags: [Standard]
 *     summary: Get all standard
 *     description: Retrieve a list of all standard.
 *     responses:
 *       200:
 *         description: A list of standard
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
 *                   description:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/', getStandards);
/**
 * @swagger
 * /standard/{id}:
 *   get:
 *     tags: [Standard]
 *     summary: Get a standard by ID
 *     description: Retrieve a single standard by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the standard
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single standard object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *       404:
 *         description: standard not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getStandard);
/**
 * @swagger
 * /standard:
 *   post:
 *     tags: [Standard]
 *     summary: Create a new standard
 *     description: Add a new standard to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: standard created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', createNewStandard);
/**
 * @swagger
 * /standard/{id}:
 *   put:
 *     tags: [Standard]
 *     summary: Update an existing standard
 *     description: Modify an existing standard by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the standard
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: standard updated successfully
 *       404:
 *         description: standard not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/:id', updateExistingStandard);
/**
 * @swagger
 * /standard/{id}:
 *   delete:
 *     tags: [Standard]
 *     summary: Delete a standard
 *     description: Remove a standard by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the standard
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: standard deleted successfully
 *       404:
 *         description: standard not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', removeStandard);

module.exports = router;