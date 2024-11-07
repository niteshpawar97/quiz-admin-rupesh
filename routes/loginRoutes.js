const express = require('express');
const { getLogins, getLogin, createNewLogin, updateExistingLogin, removeLogin } = require('../controllers/loginController');

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Logins
 *   description: API endpoints for managing logins
 */

/**
 * @swagger
 * /logins:
 *   get:
 *     summary: Get all logins
 *     tags: [Logins]
 *     responses:
 *       200:
 *         description: A list of logins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/', getLogins);
/**
 * @swagger
 * /logins/{id}:
 *   get:
 *     summary: Get a login by ID
 *     tags: [Logins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the login to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single login object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Login not found
 */
router.get('/:id', getLogin);
/**
 * @swagger
 * /logins:
 *   post:
 *     summary: Create a new login
 *     tags: [Logins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Bad request
 */
router.post('/', createNewLogin);
/**
 * @swagger
 * /logins/{id}:
 *   put:
 *     summary: Update an existing login
 *     tags: [Logins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the login to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login updated successfully
 *       404:
 *         description: Login not found
 */
router.put('/:id', updateExistingLogin);
/**
 * @swagger
 * /logins/{id}:
 *   delete:
 *     summary: Delete a login by ID
 *     tags: [Logins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the login to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Login deleted successfully
 *       404:
 *         description: Login not found
 */
router.delete('/:id', removeLogin);

module.exports = router;