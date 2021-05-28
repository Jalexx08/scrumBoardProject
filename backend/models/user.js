//* Modulos
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

//* Schema de usuario
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    date: {type: Date, default: Date.now}
});

//* Generamos JWT para el usuario
userSchema.methods.generateJWT =  function() {
    return jwt.sign({
        _id:this._id,
        name: this.name,
        iat: moment().unix() //* Genera un Código único

    }, "secretMyOwn")       //* Palabra secreta parala validación.
};

//* Colección de user en MongoDB
const User = mongoose.model("user", userSchema);


module.exports = User;
