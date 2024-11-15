const db = require('../config/db');

// Retrieve all questions
async function getAllQuestions() {
    const [rows] = await db.query('SELECT * FROM t_questions');
    return rows;
}

// Retrieve a question by ID
async function getQuestionById(id) {
    const [rows] = await db.query('SELECT * FROM t_questions WHERE tblrefid = ?', [id]);
    return rows[0];
}

// Create a new question
async function createQuestion(question) {
    const { question_text, subject_id, difficulty_level, marks, type } = question;
    const [result] = await db.query(
        'INSERT INTO t_questions (question_text, subject_id, difficulty_level, marks, type) VALUES (?, ?, ?, ?, ?)',
        [question_text, subject_id, difficulty_level, marks, type]
    );
    return result.insertId;
}

// Update an existing question
async function updateQuestion(id, question) {
    const { question_text, subject_id, difficulty_level, marks, type } = question;
    await db.query(
        'UPDATE t_questions SET question_text = ?, subject_id = ?, difficulty_level = ?, marks = ?, type = ? WHERE tblrefid  = ?',
        [question_text, subject_id, difficulty_level, marks, type, id]
    );
}

// Delete a question
async function deleteQuestion(id) {
    await db.query('DELETE FROM t_questions WHERE id = ?', [id]);
}

module.exports = { getAllQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion };