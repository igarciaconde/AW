"use strict";

const mysql = require("mysql");
const config = require("./config");
const DAOUsers = require("./DAOUsers");
const DAOTasks = require("./DAOTask");

// Crear el pool de conexiones
// ---------------------------------------------------------------------------------------
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});


let daoUser = new DAOUsers(pool);
let daoTask = new DAOTasks(pool);

//Definicion de clases
// ---------------------------------------------------------------------------------------

class Task {
    constructor(text, done, tags){
        this.text = text;
        this.done = done;
        this.tags = tags;
    }
}


// Definición de las funciones callback
// ---------------------------------------------------------------------------------------

//Calbacks user
function cb_isUserCorrect(err, result) {
    if (err) {
        console.log(err.message);
    } else if (result) {
        console.log("Usuario y contraseña correctos");
    } else {
        console.log("Usuario y/o contraseña incorrectos");
    }
}

function cb_getUserImageName(err, result) {
    if (err) {
        console.log(err.message);
    } else if (result != "") {
        console.log("El nombre de la imagen es => " + result);
    } else {
        console.log("No existe el usuario");
    }
}

//Calbacks task
function cb_getAllTasks(err, response) {
    if(err){
        console.log(err)
    }else{
        console.log(response)
    }
    process.exit(0)
}

function cb_insetTask(err){
    if(err){
        console.log(err)
    }else{
        console.log("Insert task done")
    }
    process.exit(0)
}

function cb_markTaskDone(err){
    if(err){
        console.log(err)
    }else{
        console.log("Mark task done")
    }
    process.exit(0)
}

function cb_deleteCompleted(err){
    if(err){
        console.log(err)
    }else{
        console.log("Delete done")
    }
    process.exit(0)
}

// Uso de los métodos de las clases DAOUsers y DAOTasks
// ---------------------------------------------------------------------------------------
//daoUser.isUserCorrect("edu@gmail.com", "1234", cb_isUserCorrect);
//daoUser.getUserImageName("edu@gmail.com", cb_getUserImageName);


let task = new Task("nueva tarea", false, ["AW","PEP"])

//daoTask.getAllTask("inigogar@ucm.es", cb_getAllTasks)
//daoTask.insertTask("inigogar@ucm.es",task, cb_insetTask)
//daoTask.markTaskDone(9, cb_markTaskDone)
//daoTask.deleteCompleted("inigogar@ucm.es", cb_deleteCompleted)
