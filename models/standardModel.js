const db = require('../config/db');

// Retrieve all standards
async function getAllStandard() {
    const [rows] = await db.query('SELECT * FROM m_standard');
    return rows;
}

// Retrieve a standard by ID
async function getStandardById(id) {
    const [rows] = await db.query('SELECT * FROM m_standard WHERE tblrefid = ?', [id]);
    return rows[0];
}

// Create a new standard
async function createStandard(standard) {
    const { code, name } = standard;
    const [result] = await db.query(
        'INSERT INTO m_standard (code, name) VALUES (?, ?)',
        [code, name]
    );
    return result.insertId;
}

// Update an existing standard
async function updateStandard(id, standard) {
    const { code, name } = standard;
    await db.query(
        'UPDATE m_standard SET code = ?, name = ? WHERE tblrefid = ?',
        [code, name, id]
    );
}

// Delete a standard
async function deleteStandard(id) {
    await db.query('DELETE FROM m_standard WHERE tblrefid = ?', [id]);
}

module.exports = { getAllStandard, getStandardById, createStandard, updateStandard, deleteStandard };
