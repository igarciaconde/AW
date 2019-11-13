"use strict"


class DaoTask {
    constructor(pool){
        this.pool = pool
    }

    getAllTask(email, callback){
        this.pool.getConnection(function(err,conection){
            if(err) {
                callback(new Error("Error de conexión a la base de datos"), null)
            }else {
                let sql = "SELECT task.id, task.text, task.done, tag.tag FROM task LEFT JOIN tag ON tag.taskID = task.id WHERE user = ?;"
                conection.query(sql, [email], function(err, response){
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"),null)
                    }else{
                        let res = new Array
                        let tags = new Array
                        let anterior = null
                        response.forEach(element => {
                            if(anterior != element.id){
                                tags= []
                                if(element.tag != null)
                                    tags.push(element.tag)
                                let elem = {
                                    id: element.id,
                                    text: element.text,
                                    done: element.done,
                                    tags: tags
                                }
                                anterior = element.id
                                res.push(elem)
                            }else{
                                res.forEach(elem => {
                                    if(elem.id == element.id){
                                        elem.tags.push(element.tag)
                                    } 
                                })
                            }
                        });
                        callback(null,res)
                    }
                    conection.release()
                })
            } 
        })
    }

    insertTask(email, task, callback){
        this.pool.getConnection(function(err, conection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"))
            }else {
                let sql = "INSERT INTO task(user,text,done) VALUES(?,?,?);"
                conection.query(sql,[email,task.text,task.done], function(err, response){
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"))
                    }else{
                        let id = response.insertId
                        let sql = "INSERT INTO tag(taskId, tag) VALUES "
                        let tags = new Array
                        task.tags.forEach(elem => {
                            sql += "(?,?),"
                            tags.push(id)
                            tags.push(elem)
                        })
                        sql = sql.slice(0,-1);
                        sql += ";"

                        conection.query(sql, tags, function(err){
                            if(err){
                                callback(new Error("Error de acceso a la base de datos"))
                            }
                            else {
                                callback(null)
                            }
                        })
                    }
                })
            }
        })
    }

    markTaskDone(idTask, callback) {
        this.pool.getConnection(function (err, conection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"))
            }else{
                let sql = "UPDATE task SET done = TRUE WHERE id = ?;"
                conection.query(sql, idTask, function(err){
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"))
                    }else {
                        callback(null)
                    }
                })
            }
        })
    }

    deleteCompleted(email, callback){
        this.pool.getConnection(function(err, conection){
            if(err){
                callback(new Error("Error de conexión a la base de datos"))
            }else{
                let sql = "DELETE FROM task WHERE user = ?"
                conection.query(sql,email,function(err){
                    if(err){
                        callback(new Error("Error de acceso a la base de datos"))
                    }else{
                        callback(null)
                    }
                })
            }
        })
    }
}

module.exports = DaoTask;