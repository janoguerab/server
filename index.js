const express = require("express");

const app = express();

const alumnos = [
	{
		id:"1",
		nombre:"Andres",
		apellido:"Rivera",
		comision:"dwfs"
	},{
		id:"2",
		nombre:"Maria",
		apellido:"Bueno",
		comision:"bigdata"
	},
	{
		id:"3",
		nombre:"Camila",
		apellido:"Fernandez",
		comision:"dwa"
	},{
		id:"4",
		nombre:"Mario",
		apellido:"Moreno",
		comision:"bigdata"
	}
];

// /acamica/dwfs/alumnos/abc - retorna error
// /acamica/comision/alumnos   comisio=dwfs,dwa,bigdata ?nombre(usuario)
// /acamica/comision/alumnos/1 SiNO:404

// /acamica/dwfs/alumnos
app.get("/acamica/dwsf/alumnos", (req, res, next)=>{
    res.status(200).json({
    	alumnos: alumnos,
    	message: "Todo OK"
    });
});

//Params /acamica/dwfs/alumnos/1
app.get("/acamica/dwsf/alumnos/:id",(req, res, next) => {
	if(parseInt(req.params.id)){
		res.status(200).json({
			alumnno: alumnos.find((alumno) => alumno.id === req.params.id),
		});	
	}else{
		res.status(400).json({
			message: "Bad Request!"
		});	
	}
	
});

//Params /acamica/comision/alumnos/ comisio=dwfs,dwa,bigdata  ?nombre=PEPE&apellido=...
app.get("/acamica/:comision/alumnos",(req, res, next) => {
	let nombre = req.query.nombre ? req.query.nombre:"";
	responseAlumnos = [];
	alumnos.forEach((alumno)=>{
		if(alumno.comision == req.params.comision){
			responseAlumnos.push(alumno)
		}
	})
	if(nombre){
		res.status(200).json({
			alumnno: responseAlumnos.find((alumno) => alumno.nombre ===nombre)
		});	
	}else{
		res.status(200).json({
			alumno: responseAlumnos
		});	
	}
});

//Params /acamica/comision/alumnos/:id comisio=dwfs,dwa,bigdata 
app.get("/acamica/:comision/alumnos/:id",(req, res, next) => {
	let id = req.params.id;
	responseAlumnos = [];
	alumnos.forEach((alumno)=>{
		if(alumno.comision == req.params.comision){
			responseAlumnos.push(alumno)
		}
	})
	let alumno = responseAlumnos.find((alumno) => alumno.id === id)
	if(alumno){
		res.status(200).json({
			alumno: alumno
		});	
	}else{
		// Si el alumno no pertenece a la comision
		res.status(404).json({
			message: "El alumno no existe"
		});	
	}
});

app.listen(3000,()=>{
	console.log("Escuchando en http://localhost:3000/");	
});
