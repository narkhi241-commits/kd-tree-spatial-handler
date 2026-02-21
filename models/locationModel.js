const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    name: String,
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

module.exports = mongoose.model("Location", locationSchema);