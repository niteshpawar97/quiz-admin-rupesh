const db = require('../config/db');
// TODO: name -> board_name [i am replace and update code]
async function getAllBoards() {
    const [rows] = await db.query('SELECT * FROM m_board');
    return rows;
}

async function getBoardById(id) {
    const [rows] = await db.query('SELECT * FROM m_board WHERE tblrefid = ?', [id]);
    return rows[0];
}

async function createBoard(role) {
    const { code, board_name } = role;
    const [result] = await db.query('INSERT INTO m_board (code, board_name) VALUES (?, ?)', [code, board_name]);
    return result.insertId;
}

async function updateBoard(id, role) {
    const { code, board_name } = role;
    await db.query('UPDATE m_board SET code = ?, board_name = ? WHERE tblrefid = ?', [code, board_name, id]);
}

async function deleteBoard(id) {
    await db.query('DELETE FROM m_board WHERE tblrefid = ?', [id]);
}

module.exports = { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };