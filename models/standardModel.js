const db = require('../config/db');

async function getAllStandard() {
    const [rows] = await db.query('SELECT * FROM m_standard');
    return rows;
}

async function getStandardById(id) {
    const [rows] = await db.query('SELECT * FROM m_standard WHERE tblrefid = ?', [id]);
    return rows[0];
}

async function createStandard(role) {
    const { code, name } = role;
    const [result] = await db.query('INSERT INTO m_standard (code, name) VALUES (?, ?)', [code, name]);
    return result.insertId;
}

async function updateStandard(id, role) {
    const { code, name } = role;
    await db.query('UPDATE m_standard SET code = ?, name = ? WHERE tblrefid = ?', [code, name, id]);
}

async function deleteStandard(id) {
    await db.query('DELETE FROM m_standard WHERE tblrefid = ?', [id]);
}

module.exports = { getAllStandard, getStandardById, createStandard, updateStandard, deleteStandard };