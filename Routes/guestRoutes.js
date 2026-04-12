const express = require("express");

const router = express.Router();

const guestController = require("../Controllers/guestController");
const auth = require("../Middleware/AuthenticationMiddleware");

const test = () => {console.log('middleware');
}

router.post("/guest", guestController.createGuest);
router.post("/guest/login", guestController.login);
router.get("/guest", auth, guestController.getGuest);
router.put("/guest", auth, guestController.updateGuest);
router.delete("/guest", auth, guestController.deleteGuest);

module.exports = router;