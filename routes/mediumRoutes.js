const express = require('express');
const { getMediums, getMedium, createNewMedium, updateExistingMedium, removeMedium } = require('../controllers/mediumController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Medium
 *   description: API for managing medium
 */

/**
 * @swagger
 * /medium:
 *   get:
 *     summary: Get all medium
 *     tags: [Medium]
 *     responses:
 *       200:
 *         description: A list of medium
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
router.get('/', getMediums);
/**
 * @swagger
 * /medium/{id}:
 *   get:
 *     summary: Get a medium by ID
 *     tags: [Medium]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the medium to fetch
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A medium object
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
 *         description: Medium not found
 */
router.get('/:id', getMedium);
/**
 * @swagger
 * /medium:
 *   post:
 *     summary: Create a new medium
 *     tags: [Medium]
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
 *         description: Medium created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', createNewMedium);
/**
 * @swagger
 * /medium/{id}:
 *   put:
 *     summary: Update an existing medium
 *     tags: [Medium]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the medium to update
 *         required: true
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
 *         description: Medium updated successfully
 *       404:
 *         description: Medium not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', updateExistingMedium);
/**
 * @swagger
 * /medium/{id}:
 *   delete:
 *     summary: Delete a medium by ID
 *     tags: [Medium]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the medium to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Medium deleted successfully
 *       404:
 *         description: Medium not found
 */
router.delete('/:id', removeMedium);

module.exports = router;