//* Express
const express = require("express");
const router = express.Router();

//* Modulos
const bcrypt = require("bcrypt");

//* Modelos
const User = require("../models/user");

//* Funcion login del usuario
router.post("/login", async (req, res) => {
	const user = await User.findOne({ email: req.body.email }); 			//* Buscamos el correo del usuario
	if (!user) return res.status(400).send("Email o password incorrectos"); //* Validamos si el correo trae o no resultados
	const hash = await bcrypt.compare(req.body.password, user.password);	//* Comparamos el pass que entra co nel hash de la BD
	if (!hash) return res.status(400).send("Email o password incorrectos"); //* Validamos si el pass coincide o no
	const jwtToken = user.generateJWT();									//* Devolvemos el token
	return res.status(200).send({ jwtToken });
});

module.exports = router;
