const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_CONNECTION); // don't do anything else unless mongoose connects
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (err) {
        console.log(err);
        process.exit(1); // terminate process even when async calls are still running
    }
}

module.exports = connectDB; // export without calling function