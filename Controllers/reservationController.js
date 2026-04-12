const reservationModel = require("../Models/reservationModel");
const roomModel = require("../Models/roomModel");
const {reservationCost} = require("../Services/calculateReservationCost");


exports.createReservation = async (req, res) => {
    const guest_id = req.user.guest_id;

    if (!req.user || !req.user.guest_id) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    const {start_date, end_date, room_type} = req.body;
    
    try {
        
        if (!start_date) return res.status(400).json({
            success: false,
            message: "START DATE CANT BE NULL"
        });

        if (!end_date) return res.status(400).json({
            success: false,
            message: "END DATE CANT BE NULL"
        });
        
        if (new Date(start_date) >= new Date(end_date)) {
            return res.status(400).json({
                success: false,
                message: "Invalid date range"
            });
        }
        
        if (room_type == null) return res.status(400).json({
            success: false,
            message: "ROOM TYPE CANT BE NULL"
        });
        
        const rooms = await roomModel.checkRoomAvailabiltiy(start_date, end_date, room_type);
        
        const room_no = rooms[0]?.room_no;
        
        if (!room_no) {
            return res.status(400).json({
                success: false,
                message: "No rooms available of this type"
            });
        }

        const {cost} = await roomModel.getRoomRate(room_type);
        
        if (!cost) {
            return res.status(400).json({
                success: false,
                message: "Room Rate Error"
            });
        }
        
        const totalCost = reservationCost(cost, start_date, end_date);
        
        if (!cost) {
            return res.status(400).json({
                success: false,
                message: "cost error"
            });
        }

        const {result} = await reservationModel.createReservation(start_date, end_date, room_no, guest_id, totalCost);
        


        return res.status(201).json({
            success: true,
            message: "Reservation made",
            data: result
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
        success: false,
        message: "Internal Server Error"
        });
        
    }
}

exports.updateReservation = async (req, res) => {
    const reservation_id = req.params.id;
    const {name, phn_no, email} = req.body;

    let fields = [];
    let values = [];

    if (name) {
        fields.push("name = ?");
        values.push(name);
    }
    
    if (phn_no) {
        fields.push("phn_no = ?");
        values.push(phn_no);
    }
    
    if (email) {
        fields.push("email = ?");
        values.push(email);
    }

    if (fields.length == 0) {
        return res.json({
            success: false,
            message: "No Data to Update Reservation"
        });
    }

    const {result} = await reservationModel.updateRes(reservation_id, fields, values);

    res.json({
        success: true,
        message: "Reservation Updated",
        data: result
    });
}

exports.getAllReservations = async (req, res) => {
    const guest_id = req.user.guest_id;
    
    const result = await reservationModel.displayAllReservations(guest_id);

    if (result.affectedRows == 0) {
        res.json({
        success: false,
        message: "No Reservations made by the User",
        });
    }

    return res.json({
        success: true,
        message: "Reservations returned",
        data: result
    });
}

exports.getReservation = async (req, res) => {
    const reservation_id = req.params.id;

    const guest_id = req.user.guest_id

    const result = await reservationModel.displayReservation(reservation_id, guest_id);

    if (!result || result.length == 0) {
        return res.status(404).json({
            success: false,
            message: "Reservation Not Found"
        });
    }

    return res.json({
        success: true,
        message: "Reservations returned",
        data: result
    });
}

exports.deleteReservation = async (req, res) => {
    const guest_id = req.user.guest_id;

    const reservation_id = req.params.id;

    const result = await reservationModel.deleteReservation(reservation_id, guest_id);

    if (result.affectedRows == 0) {
        res.status(404).json({
            success: false,
            message: "Reservation not found"
        });
    }

    res.json({
        success: true,
        message: "Reservation Deleted"
    })
}

exports.getCost = async (req, res) => {
    try {

        const guest_id = req.user.guest_id;
        
        const reservation_id = req.params.id;
        
        const cost = await reservationModel.getCost(reservation_id, guest_id);
        
        console.log(cost);
        
        
        if (!cost) {
            res.status(400).json({
                success: false,
                message: "Error in Retrieving Cost"
            });
        }
        
        res.status(201).json({
            success: true,
            message: "Retrieved Cost",
            data: cost
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
        success: false,
        message: "Internal Server Error"
        });
        
    }

}