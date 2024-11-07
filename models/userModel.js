const db = require('../config/db');

async function getAllUsers() {
    const [rows] = await db.query('SELECT * FROM m_users');
    return rows;
}

async function getUserById(id) {
    const [rows] = await db.query('SELECT * FROM m_users WHERE tblrefid = ?', [id]);
    return rows[0];
}

async function createUser(user) {
    const { name, dob, gender, email, phone, role_tblrefid } = user;
    const [result] = await db.query('INSERT INTO m_users (fullname, dob, gender, email, phone, role_tblrefid) VALUES (?, ?, ?, ?, ?, ?)', [name, dob, gender, email, phone, role_tblrefid]);
    return result.insertId;
}

async function updateUser(id, user) {
    const { name, dob, gender, email, phone, role_tblrefid } = user;
    await db.query('UPDATE m_users SET fullname = ?, dob = ?, gender = ?, email = ?, phone = ?, role_tblrefid = ? WHERE tblrefid = ?', [name, dob, gender, email, phone, role_tblrefid, id]);
}

async function deleteUser(id) {
    await db.query('DELETE FROM m_users WHERE tblrefid = ?', [id]);
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };