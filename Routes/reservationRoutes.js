const express = require("express");
const router = express.Router();

const reservationController = require("../Controllers/reservationController");
const auth = require("../Middleware/AuthenticationMiddleware");

router.post("/reservations", auth, reservationController.createReservation);
router.get("/reservations", auth, reservationController.getAllReservations);
router.get("/reservations/:id", auth, reservationController.getReservation);
router.get("/reservations/cost/:id", auth, reservationController.getCost);
router.put("/reservations/:id", auth, reservationController.updateReservation);
router.delete("/reservations/:id", auth, reservationController.deleteReservation);

module.exports = router;