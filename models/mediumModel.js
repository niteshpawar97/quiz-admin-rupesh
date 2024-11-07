const db = require('../config/db');

async function getAllMedium() {
    const [rows] = await db.query('SELECT * FROM m_medium');
    return rows;
}

async function getMediumById(id) {
    const [rows] = await db.query('SELECT * FROM m_medium WHERE tblrefid = ?', [id]);
    return rows[0];
}

async function createMedium(medium) {
    const { code, name } = medium;
    const [result] = await db.query('INSERT INTO m_medium (code, name) VALUES (?, ?)', [code, name]);
    return result.insertId;
}

async function updateMedium(id, medium) {
    const { code, name } = medium;
    await db.query('UPDATE m_medium SET code = ?, name = ? WHERE tblrefid = ?', [code, name, id]);
}

async function deleteMedium(id) {
    await db.query('DELETE FROM m_medium WHERE tblrefid = ?', [id]);
}

module.exports = { getAllMedium, getMediumById, createMedium, updateMedium, deleteMedium };