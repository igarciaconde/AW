const DAO = require("./dao.js");

// CREACIÓN DE UN OBJETO PARA TARBAJAR SOBRE LA BASE DE DATOS
var daoMensajeria = new DAO("localhost", "root", "", "mensajeria");


// callback de insertarUsuario
function cb_insertarUsuario(err){
	if (err) {
		console.log("***  ERROR EN LA INSERCIÓN DE USUARIO");
		 console.log(err);  
	}
	else {
		console.log("USUARIO INSERTADO CORRECTAMENTE");
		console.log("despues", usuario4);
	}
};


// callback de enviarMensaje
function cb_enviarMensaje(err){
	if (err) {
		console.log("*** ERROR EN EL ENVÍO DEL MENSAJE");
	}
	else {
		console.log("MENSAJE ENVIADO CORRECTAMENTE");
	}
};

function cb_bandejaEntrada(err, resultado){
	if (err) {
		console.log("*** ERROR EN LA LECTURA DE LA BANDEJA DE ENTRADA");
	}
	else {
		// reultado es un array de objetos
		console.log("EXITO EN LA LECTURA DE LA BANDEJA DE ENTRADA");
		console.log("Su contenido es ");
		resultado.forEach(x => {console.log(x.nombre + " " + x.mensaje + " " + x.hora);
		}); 
	}
};

function cb_buscarUsuario(err, resultado){
	if (err) {
		console.log("*** ERROR EN LA BÚSQUEDA DE USUARIOS");
	}
	else {
		// reultado es un array de objetos
		// aquí habría que informar que no se han encontardo si el tamaño de resultado es 0
		console.log("EXITO EN LA BÚSQUEDA DE USUARIOS");
		resultado.forEach((x,i) => {console.log(x.id + " " + x.nombre + " " + x.correo + " " + x.telefono)});
	}
};

function cb_terminarConexion(err, resultado){
	if (err) {
		console.log("*** ERROR EN EL CIERRE DEL POOL DE CONEXIONES");
	}
	else {
		console.log("POOL DE CONEXIONES CERRADO CORRECTAMENTE");
	}
};


////////////////////////
// INSERCIÓN DE USUARIOS
////////////////////////

// var usuario1={
// 	nombre:"nombre1",
// 	correo:"correo1",
//  telefono:"111111111"};

// var usuario3={
// 	nombre:"nombre3",
// 	correo:"correo3",
//  telefono:"333333333"};

// var usuario2={
// 	nombre:"nombre2",
// 	correo:"correo2",
//  telefono:"222222222"};

var usuario4={
	nombre:"nombre4",
	correo:"correo4",
 	telefono:"444444444"};


console.log("antes", usuario4);
daoMensajeria.insertarUsuario(usuario4, cb_insertarUsuario);
// daoMensajeria.insertarUsuario(usuario2, cb_insertarUsuario);
// daoMensajeria.insertarUsuario(usuario3, cb_insertarUsuario);

////////////////////////
// ENVIO DE MENSAJES
////////////////////////

// var usuario1={
// 	nombre:"nombre1",
// 	correo:"correo1",
//  telefono:"111111111",
// 	id:4};

// var usuario3={
// 	nombre:"nombre3",
// 	correo:"correo3",
//  	telefono:"333333333",
// 	id:6};

// var usuario2={
// 	nombre:"nombre2",
// 	correo:"correo2",
//  	telefono:"222222222",
// 	id:5};

// daoMensajeria.enviarMensaje(usuario1, usuario3, "aaaaaa", cb_enviarMensaje);
// daoMensajeria.enviarMensaje(usuario1, usuario3, "nnnnnnnnnnnn", cb_enviarMensaje);
// daoMensajeria.enviarMensaje(usuario1, usuario3, "kkkkkkkkkkkkk", cb_enviarMensaje);
// daoMensajeria.enviarMensaje(usuario1, usuario3, "7777777777777777", cb_enviarMensaje);
// daoMensajeria.enviarMensaje(usuario2, usuario3, "9999999999", cb_enviarMensaje);
// daoMensajeria.enviarMensaje(usuario2, usuario3, "vvvvvvvvvvv", cb_enviarMensaje);
// daoMensajeria.enviarMensaje(usuario2, usuario3, "ccccccccccccccccccccc", cb_enviarMensaje);


//////////////////////
// BANDEJA DE ENTRADA
//////////////////////

// var usuario1={
// 	nombre:"nombre1",
// 	correo:"correo1",
//  	telefono:"111111111",
// 	id:4};

// var usuario3={
// 	nombre:"nombre3",
// 	correo:"correo3",
//  	telefono:"333333333",
// 	id:6};

// var usuario2={
// 	nombre:"nombre2",
// 	correo:"correo2",
//  	telefono:"222222222",
// 	id:5};

// daoMensajeria.bandejaEntrada(usuario1,cb_bandejaEntrada);
// daoMensajeria.bandejaEntrada(usuario3,cb_bandejaEntrada);
// daoMensajeria.bandejaEntrada(usuario2,cb_bandejaEntrada);

////////////////////////
// BÚSQUEDA DE USUARIOS
////////////////////////

//daoMensajeria.buscarUsuario("nombre",cb_buscarUsuario);


//daoMensajeria.terminarConexion(cb_terminarConexion);