const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const guestModel = require("../Models/guestModel");

exports.createGuest = async (req, res) => {
    try {
        
        const {name, phn_no, email, password} = req.body;
        
        if (!name || !phn_no || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        
        const hashed_password = await bcrypt.hash(password, 10);
        
        const result = await guestModel.createGuest(name, phn_no, email, hashed_password);    
        
        if (result.affectedRows === 0) {
            return res.status(400).json({
                success: false,
                message: "Guest not created",
            });
        }
        
        return res.status(201).json({
            success: true,
            message: "Guest added"
        });
    }
    catch (err) {
        console.error(err);

        return res.status(500).json({
        success: false,
        message: "Internal Server Error"
        });

    }
}

exports.getGuest = async (req, res) => {
    const guest_id = req.user.guest_id;
    
    const result = await guestModel.displayGuest(guest_id);    

    if (!result || result.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Guest not found"
        })
    }

    res.json({
        success: true,
        message: "Guest Found",
        data: result
    })
}

exports.updateGuest = async (req, res) => {
    const guest_id = req.user.guest_id;

    const {name, phn_no, email, password} = req.body;

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

    if (password) {
        fields.push("password = ?");
        const hashed_password = await bcrypt.hash(password, 10);
        values.push(hashed_password);
    }

    if (fields.length == 0) {
        return res.status(400).json({
            success: false,
            message: "No Info to Update"
        });
    }

    const result = await guestModel.updateGuest(guest_id, fields, values);

    if (result.affectedRows == 0) {
        return res.status(400).json({
            success: false,
            message: "Update failed"
        });
    }

    res.json({
        success: true,
        message: "Guest information updated"
    })
}

exports.deleteGuest = async (req, res) => {
    const guest_id = req.user.guest_id;

    const result = await guestModel.deleteGuest(guest_id);

    if (result.affectedRows == 0) {
        return res.status(400).json({
        success: false,
        message: "Deletion failed"
        });
    }
    res.json({
        success: true,
        message: "Guest information deleted"
    })
}

exports.login = async (req, res) => {
    try {

        const {email, password} = req.body;
        
        const user = await guestModel.getGuestByEmail(email);
        
        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist"
            });
        }
        
        const match = await bcrypt.compare(password, user.password);
        
        if (!match) {
            return res.json({
                success: false,
                message: "Incorrect Password"
            });
        }
        
        const token = jwt.sign({guest_id: user.guest_id}, "SECRET_KEY");
        
        res.json({token})   
    }
    catch (err) {
        console.log(err);
        res.status(400).send("error");
    }

}