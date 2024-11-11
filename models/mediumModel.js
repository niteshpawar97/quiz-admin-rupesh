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
    const { medium_code, medium_name } = medium;
    const [result] = await db.query('INSERT INTO m_medium (medium_code, medium_name) VALUES (?, ?)', [medium_code, medium_name]);
    return result.insertId;
}

async function updateMedium(id, medium) {
    const { medium_code, medium_name } = medium;
    await db.query('UPDATE m_medium SET medium_code = ?, medium_name = ? WHERE tblrefid = ?', [medium_code, medium_name, id]);
}

async function deleteMedium(id) {
    await db.query('DELETE FROM m_medium WHERE tblrefid = ?', [id]);
}

module.exports = { getAllMedium, getMediumById, createMedium, updateMedium, deleteMedium };
