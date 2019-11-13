"use strict"

const mysql = require("mysql")


class DaoTask {
    constructor(pool){
        this.pool = pool
    }

    getAllTask(email, callback){
        this.pool.getConnection(function(err,conection){
            if(err) {
                callback(err, null)
            }else {
                let sql = "SELECT task.id, task.text, task.done, tag.tag FROM task LEFT JOIN tag ON tag.taskID = task.id WHERE user = ?;"
                conection.query(sql, [email], function(err, response){
                    if(err){
                        callback(err,null)
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
                callback(err, null)
            }else {
                let sql = "INSERT INTO task VALUES(?,?,?);"
                conection.query(sql,[email,task.text,task.done], function(err, response){
                    if(err){
                        callback(err,null)
                    }else{
                        callback(null,response)
                    }
                })
            }
        })
    }
}

module.exports = DaoTask;