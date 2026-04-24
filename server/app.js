const express = require("express");
const cors = require("cors");
const bfhlRoutes = require("./routes/bfhl.routess");
const path = require('path');
const { timeStamp } = require("console");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timeStamp: new Date().toISOString(),
    })
})

app.use("/bfhl", bfhlRoutes);

app.use(express.static(path.join(__dirname,"./public")));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})


module.exports = app;