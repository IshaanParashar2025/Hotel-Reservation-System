const db = require("../Config/db");

exports.checkRoomAvailabiltiy = async (start_date, end_date, room_type) => {
  const sql = `
    SELECT room_no 
    FROM rooms 
    WHERE room_type = ? 
    AND room_no NOT IN (
      SELECT room_no 
      FROM reservations 
      WHERE NOT (end_date < ? OR start_date > ?)
    )
  `;

  const [result] = await db.query(sql, [room_type, start_date, end_date]);

  return result;
};

exports.getRoomRate = async (room_type) => {
    const sql = "SELECT cost FROM room_rates WHERE room_type = ?";

    const [result] = await db.query(sql, [room_type]);

    console.log(result[0]);

    return result[0];
}
