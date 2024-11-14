const express = require('express');
const { getQuestions, getQuestion, createNewQuestion, updateExistingQuestion, removeQuestion } = require('../controllers/questionController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Question
 *   description: API to manage questions
 */

/**
 * @swagger
 * /question:
 *   get:
 *     tags: [Question]
 *     summary: Get all questions
 *     description: Retrieve a list of all questions.
 *     responses:
 *       200:
 *         description: A list of questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   question_text:
 *                     type: string
 *                   subject_id:
 *                     type: integer
 *                   difficulty_level:
 *                     type: string
 *                     enum: ["Easy", "Medium", "Hard"]
 *                   marks:
 *                     type: integer
 *                   type:
 *                     type: string
 *                     enum: ["MCQ", "Subjective"]
 *       500:
 *         description: Server error
 */
router.get('/', getQuestions);

/**
 * @swagger
 * /question/{id}:
 *   get:
 *     tags: [Question]
 *     summary: Get a question by ID
 *     description: Retrieve a single question by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the question
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single question object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 question_text:
 *                   type: string
 *                 subject_id:
 *                   type: integer
 *                 difficulty_level:
 *                   type: string
 *                   enum: ["Easy", "Medium", "Hard"]
 *                 marks:
 *                   type: integer
 *                 type:
 *                   type: string
 *                   enum: ["MCQ", "Subjective"]
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getQuestion);

/**
 * @swagger
 * /question:
 *   post:
 *     tags: [Question]
 *     summary: Create a new question
 *     description: Add a new question to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question_text:
 *                 type: string
 *               subject_id:
 *                 type: integer
 *               difficulty_level:
 *                 type: string
 *                 enum: ["Easy", "Medium", "Hard"]
 *               marks:
 *                 type: integer
 *               type:
 *                 type: string
 *                 enum: ["MCQ", "Subjective"]
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', createNewQuestion);

/**
 * @swagger
 * /question/{id}:
 *   put:
 *     tags: [Question]
 *     summary: Update an existing question
 *     description: Modify an existing question by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the question
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question_text:
 *                 type: string
 *               subject_id:
 *                 type: integer
 *               difficulty_level:
 *                 type: string
 *                 enum: ["Easy", "Medium", "Hard"]
 *               marks:
 *                 type: integer
 *               type:
 *                 type: string
 *                 enum: ["MCQ", "Subjective"]
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       404:
 *         description: Question not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/:id', updateExistingQuestion);

/**
 * @swagger
 * /question/{id}:
 *   delete:
 *     tags: [Question]
 *     summary: Delete a question
 *     description: Remove a question by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the question
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Question deleted successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', removeQuestion);

module.exports = router;