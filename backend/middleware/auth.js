//* Modulos
const jwt = require("jsonwebtoken");

//* Validamos autenticación
const auth = (req, res, next) => {
	let jwtToken = req.header("Authorization");                                 //* Revisamos el Header en su parte de autorización

	if (!jwtToken)
		return res.status(401).send("Autorización rechazada: No hay token");    //* Validamos si existe el jwt

	jwtToken = jwtToken.split(" ")[1];                                          //* Si existe el jwt vamos a separar el payload

	if (!jwtToken)
		return res.status(401).send("Autorización rechazada: No hay token");    //* Validando si el token está


	try {	                                                                    //* Validando que sea un token nuestro
		const payload = jwt.verify(jwtToken, "secretMyOwn");                    //* Revisamos palabra secreta del payload
		req.user = payload;                                                     //* Debe ser true para avanzar al next().
		next();
	} catch (error) {
		return res.status(401).send("Autorización rechazada: Token no válido");
	}
};


module.exports = auth;
