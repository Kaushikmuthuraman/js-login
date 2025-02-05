const mongoose = require("mongoose");

// Correct MongoDB Connection String
const connect = mongoose.connect("mongodb://127.0.0.1:27017/information", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Checking if database is connected or not
connect
    .then(() => console.log("Database is connected successfully"))
    .catch((err) => console.log("Database cannot be connected", err));

// Create a schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a model (Collection)
const collection = mongoose.model("users", LoginSchema);

module.exports = collection;
