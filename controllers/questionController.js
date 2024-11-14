const { getAllQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion } = require('../models/questionModel');
const Joi = require('joi');

// Input validation schema using Joi
const questionSchema = Joi.object({
    question_text: Joi.string().required(),
    subject_id: Joi.number().integer().optional(),
    difficulty_level: Joi.string().valid('Easy', 'Medium', 'Hard').required(),
    marks: Joi.number().integer().required(),
    type: Joi.string().valid('MCQ', 'Subjective').required()
});

// Get all questions
async function getQuestions(req, res, next) {
    try {
        const questions = await getAllQuestions();
        res.status(200).json({ error: false, data: questions });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Failed to fetch questions' });
        next(error);
    }
}

// Get a single question by ID
async function getQuestion(req, res, next) {
    try {
        const { id } = req.params;
        const question = await getQuestionById(id);
        if (!question) {
            return res.status(404).json({ error: true, message: 'Question not found' });
        }
        res.status(200).json({ error: false, data: question });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Failed to fetch question' });
        next(error);
    }
}

// Create a new question
async function createNewQuestion(req, res, next) {
    try {
        const { error } = questionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const questionId = await createQuestion(req.body);
        res.status(201).json({ error: false, message: 'Question created', questionId });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Failed to create question' });
        next(error);
    }
}

// Update an existing question
async function updateExistingQuestion(req, res, next) {
    try {
        const { error } = questionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const { id } = req.params;
        await updateQuestion(id, req.body);
        res.status(200).json({ error: false, message: 'Question updated' });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Failed to update question' });
        next(error);
    }
}

// Delete a question
async function removeQuestion(req, res, next) {
    try {
        const { id } = req.params;
        await deleteQuestion(id);
        res.status(200).json({ error: false, message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ error: true, message: 'Failed to delete question' });
        next(error);
    }
}

module.exports = { getQuestions, getQuestion, createNewQuestion, updateExistingQuestion, removeQuestion };