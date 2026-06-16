const express = require("express");

const cors = require("cors");

const logRequest =
require("./middleware/logRequest");

const logRoutes =
require("./routes/logRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(logRequest);

app.get("/", (req, res) => {

    res.json({
        message: "Server Running"
    });

});

app.post(
"/demo/pushlocation",
(req,res)=>{

    res.status(201).json({

        message:
        "Location Saved"

    });

});

app.use("/logs", logRoutes);

module.exports = app;