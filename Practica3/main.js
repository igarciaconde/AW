"use strict";

const mysql = require("mysql");
const config = require("./config");
const DAOUsers = require("./DAOUsers");
//const DAOTasks = require("./DAOTasks");

// Crear el pool de conexiones
// ---------------------------------------------------------------------------------------

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let daoUser = new DAOUsers(pool);
//let daoTask = new DAOTasks(pool);

// Definición de las funciones callback
// ---------------------------------------------------------------------------------------

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

// Uso de los métodos de las clases DAOUsers y DAOTasks
// ---------------------------------------------------------------------------------------
daoUser.isUserCorrect("edu@gmail.com", "1234", cb_isUserCorrect);
daoUser.getUserImageName("edu@gmail.com", cb_getUserImageName);
