//* Modulos
const mongoose = require("mongoose");


//* Schema de board
const boardSchema = new mongoose.Schema({
    userId: String,
    name: String,
    description: String,
    status: String,
    imageUrl: String,
    date: {type: Date, default: Date.now}
});

//* Colleción board en MongoDB
const Board = mongoose.model("board",boardSchema );


module.exports = Board;
