const db = require('../config/db');

async function getAllSubjects() {
    const [rows] = await db.query('SELECT * FROM m_subject');
    return rows;
}

async function getSubjectById(id) {
    const [rows] = await db.query('SELECT * FROM m_subject WHERE tblrefid = ?', [id]);
    return rows[0];
}

async function createSubject(role) {
    const { code, name } = role;
    const [result] = await db.query('INSERT INTO m_subject (code, name) VALUES (?, ?)', [code, name]);
    return result.insertId;
}

async function updateSubject(id, role) {
    const { code, name } = role;
    await db.query('UPDATE m_subject SET code = ?, name = ? WHERE tblrefid = ?', [code, name, id]);
}

async function deleteSubject(id) {
    await db.query('DELETE FROM m_subject WHERE tblrefid = ?', [id]);
}

module.exports = { getAllSubjects, getSubjectById, createSubject, updateSubject, deleteSubject };