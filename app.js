const express = require("express");
const app = express();

const reservationRoutes = require("./Routes/reservationRoutes");
const guestRoutes = require("./Routes/guestRoutes");

app.use(express.json());

app.use("/api", reservationRoutes);
app.use("/api", guestRoutes);

app.listen(3000, () => {
    console.log("SERVER IS RUNNING");
}); 