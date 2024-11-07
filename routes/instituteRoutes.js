const express = require('express');
const { getInstitutes, getInstitute, createNewInstitute, updateExistingInstitute, removeInstitute } = require('../controllers/instituteController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Institutes
 *   description: API for managing institutes
 */

/**
 * @swagger
 * /institutes:
 *   get:
 *     tags: [Institutes]
 *     summary: Get all institutes
 *     description: Retrieve a list of all institutes
 *     responses:
 *       200:
 *         description: A list of institutes
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
 *                   address:
 *                     type: string
 */
router.get('/', getInstitutes);
/**
 * @swagger
 * /institutes/{id}:
 *   get:
 *     tags: [Institutes]
 *     summary: Get a single institute
 *     description: Retrieve details of a specific institute by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the institute to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Institute found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *       404:
 *         description: Institute not found
 */
router.get('/:id', getInstitute);
/**
 * @swagger
 * /institutes:
 *   post:
 *     tags: [Institutes]
 *     summary: Create a new institute
 *     description: Add a new institute to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Institute created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', createNewInstitute);
/**
 * @swagger
 * /institutes/{id}:
 *   put:
 *     tags: [Institutes]
 *     summary: Update an existing institute
 *     description: Modify the details of an existing institute
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the institute to update
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
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Institute updated successfully
 *       404:
 *         description: Institute not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', updateExistingInstitute);
/**
 * @swagger
 * /institutes/{id}:
 *   delete:
 *     tags: [Institutes]
 *     summary: Delete an institute
 *     description: Remove an institute from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the institute to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Institute deleted successfully
 *       404:
 *         description: Institute not found
 */
router.delete('/:id', removeInstitute);

module.exports = router;