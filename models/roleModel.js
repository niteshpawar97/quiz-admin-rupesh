const db = require('../config/db');

async function getAllRoles() {
    const [rows] = await db.query('SELECT * FROM m_roles');
    return rows;
}

async function getRoleById(id) {
    const [rows] = await db.query('SELECT * FROM m_roles WHERE tblrefid = ?', [id]);
    return rows[0];
}

async function createRole(role) {
    const { code, name } = role;
    const [result] = await db.query('INSERT INTO m_roles (code, name) VALUES (?, ?)', [code, name]);
    return result.insertId;
}

async function updateRole(id, role) {
    const { code, name } = role;
    await db.query('UPDATE m_roles SET code = ?, name = ? WHERE tblrefid = ?', [code, name, id]);
}

async function deleteRole(id) {
    await db.query('DELETE FROM m_roles WHERE tblrefid = ?', [id]);
}

module.exports = { getAllRoles, getRoleById, createRole, updateRole, deleteRole };