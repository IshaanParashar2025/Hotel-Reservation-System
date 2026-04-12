const db = require("../Config/db");

exports.createReservation = async (start_date, end_date, room_no, guest_id, cost) => {
    const sql = "INSERT INTO reservations (start_date, end_date, room_no, guest_id, cost) VALUES (?,?,?,?,?)";
    const [result] = await db.query(sql, [start_date, end_date, room_no, guest_id, cost]);
    return result;
}

exports.updateReservation = async (reservation_id, fields, values) => {
    const sql = `UPDATE reservations SET ${fields.join(',')} WHERE reservation_id = ?`;
    const [result] = await db.query(sql, [...values , reservation_id]);
    return result;
}

exports.displayReservation = async (reservation_id, guest_id) => {
    const sql = `SELECT * FROM reservations WHERE reservation_id = ? AND guest_id = ?`;
    const [result] = await db.query(sql, [reservation_id, guest_id]);
    return result;
}

exports.displayAllReservations = async (guest_id) => {
    const sql = `SELECT * FROM reservations WHERE guest_id = ?`;
    const result = await db.query(sql, [guest_id]);
    return result[0];
}

exports.deleteReservation = async (reservation_id, guest_id) => {
    const sql = "DELETE FROM reservations WHERE reservation_id = ? AND guest_id = ?";
    const [result] = await db.query(sql, [reservation_id, guest_id]);
    return result;
}

exports.getGuest_id = async (reservation_id) => {
    const sql = "SELECT guest_id FROM reservation WHERE reservation_id = ?";

    const [result] = await db.query(sql, [reservation_id]);

    return result;
}

exports.getCost = async (reservation_id, guest_id) => {
    const sql = "SELECT cost FROM reservations WHERE reservation_id = ? AND guest_id = ?";

    console.log("starting query");
    

    const [result] = await db.query(sql, [reservation_id, guest_id]);

    console.log(result);

    return result[0];
}