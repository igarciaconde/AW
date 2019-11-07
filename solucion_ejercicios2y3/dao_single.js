"use strict";

const mysql = require("mysql");


class DAO {

    constructor(host, user, pass, db) {
        this.host = host;
        this.user = user;
        this.pass = pass;
		this.bd = db;
    }

    insertarUsuario(usuario, callback) {
	
		// createConnection es síncrona
		const conexion = crearConexion(this.host, this.user, this.pass,this.bd);

		// Se controla que la configuración de la conexion es correcta
		// posteriomente en el intento de conexion. 
	
		
    	conexion.connect(function(err) {
			if (err) {
				callback(err);
			}
			else {
				let sql ="INSERT INTO usuarios (nombre, correo, telefono) VALUES (?,?,?);";
				let params = [usuario.nombre, usuario.correo, usuario.telefono];
				conexion.query(sql,params, function(err,resultado){ 
					if(err) {
						callback(err);
					}
					else {
						usuario.id = resultado.insertId;
						callback(null);
					}
					conexion.end();  // es asímcrona. Habría que hacer callback
				})
			}})
    }   // insertarUsuario

    enviarMensaje(usuarioOrigen, usuarioDestino, mensaje, callback) {

		// createConnection es síncrona
		const conexion = crearConexion(this.host, this.user, this.pass,this.bd);

		// Se controla que la configuración de la conexion es correcta
		// posteriomente en el intento de conexion.

		conexion.connect(function(err) {
  								 if (err) {
								   callback(err);
							   	 }
    							else {
    								let origen = usuarioOrigen.id;
    								let destino = usuarioDestino.id;
    								let leido = 0;
    								let sql="INSERT INTO mensajes (idOrigen, idDestino, mensaje, leido) VALUES (?,?,?,?);"; 
									let parmams = [origen, destino, mensaje, leido];
									conexion.query(sql,params,function(err,resultado){ 
    									if (err) {
    										callback(err);
    									}
    									else {
    										callback(null);
										}
										conexion.end();
    								})
    							}})
    }  // enviarMensaje

    bandejaEntrada(usuario, callback) {

		// createConnection es síncrona
		const conexion = crearConexion(this.host, this.user, this.pass,this.bd);

		// Se controla que la configuración de la conexion es correcta
		// posteriomente en el intento de conexion.
    	conexion.connect(function(err) {
								if (err) {
									callback(err);
			 					}
    							else {    								
    									// HACER UNA VERSIÓN DE CONSULTA PARAMÉTRICA
										// SE HARÍA MÁS RÁPIDO CON UN JOIN
										 let sql = "SELECT origen.nombre, mensajes.mensaje, mensajes.hora\
										 			FROM usuarios AS ORIGEN, mensajes, usuarios AS DESTINO\
										 			WHERE (ORIGEN.id = mensajes.idOrigen) AND\
										 			(DESTINO.id = mensajes.idDestino) AND\
      									  			(mensajes.leido=0) AND \
      									  			(mensajes.idDestino = ? );";
										let id = usuario.id;
    									conexion.query(sql, [id], function(err,resultado){ 
    																	if(err) {
    																		callback(err);
    																	}
    																	else {
    																		callback(null, resultado);
																		}
																		conexion.end();
    								})
    							}})
    }   // bandejaEntrada

    buscarUsuario(str, callback) {

		// createConnection es síncrona
		const conexion = crearConexion(this.host, this.user, this.pass,this.bd);

		// Se controla que la configuración de la conexion es correcta
		// posteriomente en el intento de conexion. 

    	conexion.connect(function(err) {
					if (err) {
						callback(err);
					}
					else { 
    				var sql="SELECT * FROM usuarios WHERE nombre LIKE \"%" + str + "%\"" +";";
    				conexion.query(sql,function(err,resultado){ 
    									if(err) {
    										callback(err);
    									}
    									else {
    											callback(null, resultado);
										}
										conexion.end();
    								})
    							}})
	 }   // buscarUsuario


}	//DAO

// Esta función no se exporta. Es una utilidad interna del módulo
function crearConexion(h, usr, pass, bd) {
	// Operación SÍNCRONA
	let conexion = mysql.createConnection(
		{
			host: h,
			user: usr,
			password: pass,
			database:bd
		});
	return conexion;
}

module.exports = DAO;