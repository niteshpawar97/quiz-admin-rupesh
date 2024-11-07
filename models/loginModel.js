const db = require('../config/db');

async function getAllLogins() {
    const [rows] = await db.query('SELECT * FROM m_logins');
    return rows;
}

async function getLoginById(id) {
    const [rows] = await db.query('SELECT * FROM m_logins WHERE tblrefid = ?', [id]);
    return rows[0];
}

async function createLogin(user) {
    const {user_id, name, dob, gender, email, phone, role_tblrefid } = user;
    const [result] = await db.query('INSERT INTO m_logins (user_id, fullname, dob, gender, email, phone, role_tblrefid) VALUES (?, ?, ?, ?, ?, ?)', [user_id, name, dob, gender, email, phone, role_tblrefid]);
    return result.insertId;
}

async function updateLogin(id, user) {
    const { user_id, name, dob, gender, email, phone, role_tblrefid } = user;
    await db.query('UPDATE m_logins SET user_id = ?, fullname = ?, dob = ?, gender = ?, email = ?, phone = ?, role_tblrefid = ? WHERE tblrefid = ?', [user_id, name, dob, gender, email, phone, role_tblrefid, id]);
}

async function deleteLogin(id) {
    await db.query('DELETE FROM m_logins WHERE tblrefid = ?', [id]);
}

module.exports = { getAllLogins, getLoginById, createLogin, updateLogin, deleteLogin };