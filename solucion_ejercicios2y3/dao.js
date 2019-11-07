"use strict";

const mysql = require("mysql");


class DAO {

    constructor(host, user, pass, db) {
		this.pool = mysql.createPool({host:host, user:user, password:pass, database:db});
    }

    insertarUsuario(usuario, callback) {
    	this.pool.getConnection(function(err, conexion) {
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
							console.log(resultado);
							callback(null);
						}
						conexion.release();
					})
				}})
    }   // insertarUsuario

    enviarMensaje(usuarioOrigen, usuarioDestino, mensaje, callback) {

		this.pool.getConnection(function(err, conexion) {
				if (err) {
				callback(err);
				}
			else {
				let origen = usuarioOrigen.id;
				let destino = usuarioDestino.id;
				let leido = 0;
				let sql="INSERT INTO mensajes (idOrigen, idDestino, mensaje, leido) VALUES (?,?,?,?,?);";
				let params = [origen, destino, mensaje, leido];
				conexion.query(sql, params, function(err,resultado){ 
					if (err) {
						callback(err);
					}
					else {
						callback(null);
					}
					conexion.release();
				})
			}})
    }  // enviarMensaje

    bandejaEntrada(usuario, callback) {

    	this.pool.getConnection(function(err, conexion) {
								if (err) {
									callback(err);
			 					}
    							else {  
										 let sql = "SELECT origen.nombre, mensajes.mensaje, mensajes.hora\
										 			FROM usuarios AS ORIGEN, mensajes, usuarios AS DESTINO\
										 			WHERE (ORIGEN.id = mensajes.idOrigen) AND\
										 			(DESTINO.id = mensajes.idDestino) AND\
      									  			(mensajes.leido=0) AND \
      									  			(mensajes.idDestino = ? );";
										let id = usuario.id;
    									conexion.query(sql, [id], function(err, resultado){ 
    																	if(err) {
    																		callback(err);
    																	}
    																	else {
    																		callback(null, resultado);
																		}
																		conexion.release();
    								})
    							}})
    }   // bandejaEntrada

    buscarUsuario(str, callback) {

    	this.pool.getConnection(function(err, conexion) {
			if (err) {
				callback(err);
			 }
			else { 
					// let sql="SELECT * FROM usuarios WHERE nombre LIKE \"%" + str + "%\"" +";";
					// conexion.query(sql,function(err,resultado){ 
					let sql='SELECT * FROM usuarios WHERE nombre LIKE ?;';
    				conexion.query(sql, ['%' + str + '%'],function(err,resultado){ 
    									if(err) {
    										callback(err);
    									}
    									else {
											callback(null, resultado);
											console.log(resultado);
										}
										conexion.release();
    								})
    							}})
	}   // buscarUsuario

	terminarConexion(callback) {
		this.pool.end(function(err) {
			callback(err)
		});
	}	// terminarConexion


}	//DAO{}


module.exports = DAO;