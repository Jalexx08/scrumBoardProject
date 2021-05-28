//* Express
const express = require("express");
const router = express.Router();

//* Modelos
const Board = require("../models/board");
const User = require("../models/user");

//* Middleware
const Auth = require("../middleware/auth");

//* Registrar actividad sin imagen
router.post("/saveTask", Auth, async (req, res) => {
	const user = await User.findById(req.user._id);							//* Buscar usuarios de la petición
	if (!user) return res.status(401).send("Usuario no autenticado");		//* Si no se encuentra el usuario
	const board = new Board({												//* Si el usuario existe procedemos a registrar
		userId: user._id,
		name: req.body.name,
		description: req.body.description,
		status: "to-do",
	});
	const result = await board.save();										//* Guardamos en MongoDB
	return res.status(200).send({ result });
});

//* Consultar todas las actividades
router.get("/listTask", Auth, async (req, res) => {
	const user = await User.findById(req.user._id);							//* Obtnemos el usuario por id
	if (!user) return res.status(401).send("La persona no existe en BD");	//*Validamos si el usuario no existe
	const board = await Board.find({ userId: req.user._id }); 				//* Si la persona existe
	return res.status(200).send({ board });
});

//* Editar actividad
router.put("/updateTask", Auth, async (req, res) => {
	
	const user = await User.findById(req.user._id); 						//* Validamos usuario
	if (!user) return res.status(401).send("No existe el usuario");
	
	const board = await Board.findByIdAndUpdate(req.body._id, { 			//* Editamos actividad
		userId: user._id,
		name: req.body.name,
		description: req.body.description,
		status: req.body.status,
	});

	if (!board) return res.status(401).send("No se pudo editar la información");
	return res.status(200).send({ board });
});

//* Eliminar actividad
router.delete("/:_id", Auth, async (req, res) => {
	const user = await User.findById(req.user._id);
	if (!user) return res.status(401).send("No Existe el usuario");
	const board = await Board.findByIdAndDelete(req.params._id);
	if (!board) return res.status(401).send("No hay tarea para eliminar");
	return res.status(200).send("Actividad eliminada");
});


module.exports = router;
