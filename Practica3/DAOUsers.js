"use strict";

const mysql = require("mysql");

class DAOUsers {

    constructor(pool) {
       this.pool = pool;
    }

    isUserCorrect(email, password, callback) {

        this.pool.getConnection(function (err, conexion) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos " + err), false);
            }
            else {

                let sql = "SELECT email, password FROM user WHERE email = ? AND password = ?;";
                let params = [email, password];

                conexion.query(sql, params, function (err, resultado) {
                    // devolvemos conexion al pool
                    conexion.release();

                    if (err) {
                        callback(new Error("Error de acceso a la base de datos " + err), false);
                    }
                    else {

                        if (resultado.length == 1) {
                            callback(null, true);
                        }
                        else {
                            callback(err, false);
                        }
                    }
                })
            }
        })
    }


    getUserImageName(email, callback) {

        this.pool.getConnection(function (err, conexion) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos " + err), false);
            }
            else {

                let sql = "SELECT img FROM user WHERE email = ?;";
          
                conexion.query(sql, email, function (err, resultado) {
                    // devolvemos conexion al pool
                    conexion.release();

                    if (err) {
                        callback(new Error("Error de acceso a la base de datos " + err), false);
                    }
                    else {

                        if (resultado.length == 1) {
                            callback(null, resultado[0].img);
                        }
                        else {
                            callback(err, "");
                        }
                    }
                })
            }
        })
    }

}


module.exports = DAOUsers;