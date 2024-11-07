// subjectModel.js
const db = require('../config/db');

// Retrieve all subjects
async function getAllSubjects() {
    const [rows] = await db.query('SELECT * FROM m_subjects');
    return rows;
}

// Retrieve a subject by ID
async function getSubjectById(id) {
    const [rows] = await db.query('SELECT * FROM m_subjects WHERE tblrefid = ?', [id]);
    return rows[0];
}

// Create a new subject
async function createSubject(subject) {
    const { code, name, standard_id } = subject;
    const [result] = await db.query(
        'INSERT INTO m_subjects (code, name, standard_id) VALUES (?, ?, ?)',
        [code, name, standard_id]
    );
    return result.insertId;
}

// Update an existing subject
async function updateSubject(id, subject) {
    const { code, name, standard_id } = subject;
    await db.query(
        'UPDATE m_subjects SET code = ?, name = ?, standard_id = ? WHERE tblrefid = ?',
        [code, name, standard_id, id]
    );
}

// Delete a subject
async function deleteSubject(id) {
    await db.query('DELETE FROM m_subjects WHERE tblrefid = ?', [id]);
}

module.exports = { getAllSubjects, getSubjectById, createSubject, updateSubject, deleteSubject };
