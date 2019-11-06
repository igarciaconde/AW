
const mysql = require("mysql"); // require fuera

class DAO {

    constructor(host, user, password, database) {
        this.pool = mysql.createPool({
            host: host,
            user: user,
            password: password,
            database: database
        });
    }

    insertarUsuario(usuario, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err); // new error("Error de conexion")
            }
            else {
                 // Consulta parametrica value(?,?,?) con los parametros en un array
                const sql = "INSERT INTO USUARIOS(Nombre, Correo, Telefono) "
                    + "VALUES ('" + usuario["nombre"] + "','" + usuario["correo"] + "','"
                    + usuario["telefono"] + "')";

                connection.query(sql, function (err, resultado) {
                    connection.release();
                    if (err) {
                        console.log("Error de inserción: " + err);
                        callback(err)
                    } else {
                        // Identificador de la nueva fila
                        usuario["id"] = resultado.insertId; // usar notacion punto(usuario.id)
                        callback(null)
                    }
                });
            }
        });
    }

    enviarMensaje(usuarioOrigen, usuarioDestino, mensaje, callback) {

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(err);
            }
            else {

                // Hacerla parametrica
                const sql = "INSERT INTO MENSAJES(idOrigen, idDestino, mensaje, leido) "
                    + "VALUES ('" + usuarioOrigen["id"] + "','" + usuarioDestino["id"] + "','"
                    + mensaje + "','" + 0 + "')";

                connection.query(sql, function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err)
                    } else {
                        // Imprime el identificador de la nueva fila
                        console.log(resultado.insertId);
                        // Imprime el número de filas insertadas
                        console.log(resultado.affectedRows);
                        callback(null)
                    }
                });
            }
        });


    }

    bandejaEntrada(usuario, callback) {
        this.pool.getConnection(function (err, conncetion) {
            if (err) {
                callback("Error al conectarse a la base de datos")
            } else {
                const sql = "SELECT * FROM mensajes WHERE idDestino="
                    + usuario["id"] + " AND leido=0";

                conncetion.query(sql, function (err, resultado) {
                    conncetion.release()
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(null, resultado)
                    }
                })
            }
        })
    }

    buscarUsuario(str, callback) {

        this.pool.getConnection(function (err, conncetion) {
            if (err) {
                callback("Error al conectarse a la base de datos")
            } else {
                const sql = "SELECT * FROM USUARIOS WHERE nombre LIKE '%" + str + "%'"

                conncetion.query(sql, function (err, resultado) {
                    conncetion.release()
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(null, resultado)
                    }
                })
            }
        })
    }

    terminarConexion(callback) {

        this.pool.end(function (err) {
            if (err) {
                callback("Error al cerrar la base de datos");
            } else {
                callback(null);
            }
        });
    }

}

module.exports = DAO;

