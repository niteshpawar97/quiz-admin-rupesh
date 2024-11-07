const db = require('../config/db');

async function getAllInstitutes() {
    const [rows] = await db.query('SELECT * FROM m_institute');
    return rows;
}

async function getInstituteById(id) {
    const [rows] = await db.query('SELECT * FROM m_institute WHERE tblrefid = ?', [id]);
    return rows[0];
}

async function createInstitute(institute) {
    const { institute_name, institute_phone, institute_email, institute_website, isactive, api_key } = institute;
    const [result] = await db.query('INSERT INTO m_institute (institute_name, institute_phone, institute_email, institute_website, isactive, api_key) VALUES (?, ?, ?, ?, ?, ?)', [institute_name, institute_phone, institute_email, institute_website, isactive, api_key]);
    return result.insertId;
}

async function updateInstitute(id, institute) {
    const { institute_name, institute_phone, institute_email, institute_website, isactive, api_key } = institute;
    await db.query('UPDATE m_institute SET institute_name = ?, institute_phone = ?, institute_email = ?, institute_website = ?, isactive = ?, api_key = ? WHERE tblrefid = ?', [institute_name, institute_phone, institute_email, institute_website, isactive, api_key, id]);
}

async function deleteInstitute(id) {
    await db.query('DELETE FROM m_institute WHERE tblrefid = ?', [id]);
}

module.exports = { getAllInstitutes, getInstituteById, createInstitute, updateInstitute, deleteInstitute };