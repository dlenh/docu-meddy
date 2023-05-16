const mongoose = require("mongoose"); 

const medListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rxcui: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("MedList", medListSchema, "meds");