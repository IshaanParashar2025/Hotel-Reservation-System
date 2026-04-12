const db = require("../Config/db");

exports.createGuest = async (name, phn_no, email, password) => {
    
    const sql = "INSERT INTO guests (name, phn_no, email, password) VALUES (?,?,?, ?)";
    const [result] = await db.query(sql, [name, phn_no, email, password]);

    return result;
}


exports.updateGuest = async (guest_id, fields, values) => {
    const sql = `UPDATE guests SET ${fields.join(',')} WHERE guest_id = ?`;
    const [result] = await db.query(sql, [...values , guest_id]);
    return {result};
}


exports.displayGuest = async (guest_id) => {
    const sql = `SELECT * FROM guests WHERE guest_id = ?`;
    const [result] = await db.query(sql, [guest_id]);    
    return result[0];
}


exports.deleteGuest = async (guest_id) => {
    const sql = "DELETE FROM guests WHERE guest_id = ?";
    const [result] = await db.query(sql, [guest_id]);
    return result;
}

exports.getGuestByEmail = async (email) => {
    const sql = "SELECT * FROM guests WHERE email = ?";
    const [rows] = await db.query(sql, [email]);
    return rows[0];
}
