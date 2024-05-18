//Server initiation
const express = require("express");
const app = express();

//Middleware
app.use(express.json());

//Mouting of Routes
const authRoutes = require("./routes/auth");
app.use("/v1",authRoutes);

//Connecting to DB
const dbConnect = require("./config/db");
dbConnect();

//Activation of Server
app.listen(4000,()=>{
    console.log("Port running Successfully At Port no 4000");
});
