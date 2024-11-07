const express = require('express');
const { getSubjects, getSubject, createNewSubject, updateExistingSubject, removeSubject } = require('../controllers/subjectController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subjects
 *   description: Subject management
 */

/**
 * @swagger
 * /subjects:
 *   get:
 *     summary: Get all subjects
 *     description: Retrieve a list of all subjects
 *     tags: [Subjects]
 *     responses:
 *       200:
 *         description: A list of subjects
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
 */

/**
 * @swagger
 * /subjects/{id}:
 *   get:
 *     summary: Get a subject by ID
 *     description: Retrieve a single subject by their ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subject to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A subject object
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
 *         description: Subject not found
 */

/**
 * @swagger
 * /subjects:
 *   post:
 *     summary: Create a new subject
 *     description: Add a new subject to the database
 *     tags: [Subjects]
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
 *         description: Subject created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /subjects/{id}:
 *   put:
 *     summary: Update an existing subject
 *     description: Update a subject by their ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subject to update
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
 *         description: Subject updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Subject not found
 */

/**
 * @swagger
 * /subjects/{id}:
 *   delete:
 *     summary: Delete a subject
 *     description: Remove a subject by their ID
 *     tags: [Subjects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the subject to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Subject deleted successfully
 *       404:
 *         description: Subject not found
 */

router.get('/', getSubjects);
router.get('/:id', getSubject);
router.post('/', createNewSubject);
router.put('/:id', updateExistingSubject);
router.delete('/:id', removeSubject);

module.exports = router;