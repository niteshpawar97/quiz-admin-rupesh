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
    console.log("Fetching all questions...");
    try {
        const questions = await getAllQuestions();
        console.log("Questions fetched successfully:", questions);
        res.status(200).json({ error: false, data: questions });
    } catch (error) {
        console.error("Error fetching questions:", error.message);
        res.status(500).json({ error: true, message: 'Failed to fetch questions' });
        next(error);
    }
}

// Get a single question by ID
async function getQuestion(req, res, next) {
    const { id } = req.params;
    console.log(`Fetching question with ID: ${id}`);
    try {
        const question = await getQuestionById(id);
        if (!question) {
            console.warn(`Question with ID ${id} not found`);
            return res.status(404).json({ error: true, message: 'Question not found' });
        }
        console.log("Question fetched successfully:", question);
        res.status(200).json({ error: false, data: question });
    } catch (error) {
        console.error("Error fetching question:", error.message);
        res.status(500).json({ error: true, message: 'Failed to fetch question' });
        next(error);
    }
}

// Create a new question
async function createNewQuestion(req, res, next) {
    console.log("Creating new question with data:", req.body);
    try {
        const { error } = questionSchema.validate(req.body);
        if (error) {
            console.warn("Validation error:", error.details[0].message);
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        const questionId = await createQuestion(req.body);
        console.log("Question created with ID:", questionId);
        res.status(201).json({ error: false, message: 'Question created', questionId });
    } catch (error) {
        console.error("Error creating question:", error.message);
        res.status(500).json({ error: true, message: 'Failed to create question' });
        next(error);
    }
}

// Update an existing question
async function updateExistingQuestion(req, res, next) {
    const { id } = req.params;
    console.log(`Updating question with ID: ${id} with data:`, req.body);
    try {
        const { error } = questionSchema.validate(req.body);
        if (error) {
            console.warn("Validation error:", error.details[0].message);
            return res.status(400).json({ error: true, message: error.details[0].message });
        }

        await updateQuestion(id, req.body);
        console.log(`Question with ID ${id} updated successfully.`);
        res.status(200).json({ error: false, message: 'Question updated' });
    } catch (error) {
        console.error("Error updating question:", error.message);
        res.status(500).json({ error: true, message: 'Failed to update question' });
        next(error);
    }
}

// Delete a question
async function removeQuestion(req, res, next) {
    const { id } = req.params;
    console.log(`Deleting question with ID: ${id}`);
    try {
        await deleteQuestion(id);
        console.log(`Question with ID ${id} deleted successfully.`);
        res.status(200).json({ error: false, message: 'Question deleted' });
    } catch (error) {
        console.error("Error deleting question:", error.message);
        res.status(500).json({ error: true, message: 'Failed to delete question' });
        next(error);
    }
}

module.exports = { getQuestions, getQuestion, createNewQuestion, updateExistingQuestion, removeQuestion };
