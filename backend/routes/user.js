//* Express
const express = require("express");
const router = express.Router();

//* Modulos
const bcrypt = require("bcrypt");

//* Modelos
const User = require("../models/user");

//* Registrar usuario - async -await POST
router.post("/registerUser", async (req, res) => {
	let user = await User.findOne({ email: req.body.email });       //* Validamos que el correo existe en BD
	if (user) return res.status(400).send("El usuario ya existe");  //* Si el usuario ya existe mostramos un mensaje
	const hash = await bcrypt.hash(req.body.password, 10);          //* Encryptamos el password

    user = new User({                                               //* Guardamos los datos del usuario
		name: req.body.name,
		email: req.body.email,
		password: hash,
	});

	const result = await user.save();
	if (result) {
		const jwtToken = user.generateJWT();                        //* Generando JWT
		res.status(200).send({ jwtToken });
	} else {
		return res.status(400).send("No se pudo registrar el usuario");
	}
});

module.exports = router;
