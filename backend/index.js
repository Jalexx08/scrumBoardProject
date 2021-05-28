//* Express
const express = require("express");
const app = express();

//* Modulos
const mongoose = require("mongoose");

//* Rutas( Controlador)
const User = require("./routes/user");
const Auth = require("./routes/auth");
const Board = require("./routes/board");

app.use(express.json()); //* Trabjar con jsons

//* Middleware de rutas
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/board/", Board);

//* Configuración de los puertos del servidor
const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Servidor ejecutando en puerto: " + port)); //http://localhost:3001/api/user/registerUser

//* Conexion con MongoDB
mongoose
	.connect("mongodb://127.0.0.1:27017/sbprojectdb", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => console.log("Conexion con MongoDB ON"))
	.catch((err) => console.log("Error al conectar con MongoDB", err));
