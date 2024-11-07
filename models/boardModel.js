const db = require('../config/db');

async function getAllBoards() {
    const [rows] = await db.query('SELECT * FROM m_board');
    return rows;
}

async function getBoardById(id) {
    const [rows] = await db.query('SELECT * FROM m_board WHERE tblrefid = ?', [id]);
    return rows[0];
}

async function createBoard(role) {
    const { code, name } = role;
    const [result] = await db.query('INSERT INTO m_board (code, name) VALUES (?, ?)', [code, name]);
    return result.insertId;
}

async function updateBoard(id, role) {
    const { code, name } = role;
    await db.query('UPDATE m_board SET code = ?, name = ? WHERE tblrefid = ?', [code, name, id]);
}

async function deleteBoard(id) {
    await db.query('DELETE FROM m_board WHERE tblrefid = ?', [id]);
}

module.exports = { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };