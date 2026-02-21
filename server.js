const express = require("express");
const mongoose = require("mongoose");
const spatialRoutes = require("./routes/spatialRoutes");

const app = express();

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/spatialDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use(express.json());

// CONNECT ROUTES
app.use("/api/spatial", spatialRoutes);

app.get("/", (req, res) => {
    res.send("Server Working");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});