const express = require('express');
const { getRoles, getRole, createNewRole, updateExistingRole, removeRole } = require('../controllers/roleController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: API for managing roles
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: A list of roles
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
router.get('/', getRoles);
/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the role to fetch
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A role object
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
 *         description: Role not found
 */
router.get('/:id', getRole);
/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
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
 *         description: Role created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', createNewRole);
/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     summary: Update an existing role
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the role to update
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
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', updateExistingRole);
/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the role to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */
router.delete('/:id', removeRole);

module.exports = router;