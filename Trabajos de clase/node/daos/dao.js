const mysql = require("mysql");




class DAO {
    
    constructor(host,user,password,database){
        this.pool = mysql.createPool({
            host: host,
            user: user,
            password: password,
            database: database
        })
    }

    insertarUsuario(usuario, callback){
        this.pool.getConnection(function(err, conncetion){
            if(err){
                callback("Error al conectarse a la base de datos")
            }else{
                const sql = "INSERT INTO usuarios(Nombre, Correo, Telefono) "
                    + "VALUES ('" + usuario["nombre"] + "','" + usuario["correo"] + "','"
                     + usuario["telefono"] + "')";

                conncetion.query(sql, function(err, resultado){
                    conncetion.release()
                    if(err){
                        callback(err)
                    }else{
                        callback(null)
                    }
                })
            }
        })
    }
    enviarMensaje(usuarioOrigen, usuarioDestino, mensaje, callback){}
    bandejaEntrada(usuario,callback){
        this.pool.getConnection(function(err, conncetion){
            if(err){
                callback("Error al conectarse a la base de datos")
            }else{
                const sql = "SELECT * FROM mensajes WHERE idDestino="
                + usuario["id"] + " AND leido=0";

                conncetion.query(sql, function(err, resultado){
                    conncetion.release()
                    if(err){
                        callback(err, null)
                    }else{
                        callback(null, resultado)
                    }
                })
            }
        })
    }
    buscarUsuario(str,callback){}
    terminarConexion(){}
}

module.exports = DAO;