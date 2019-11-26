"use strict"

const express = require("express")
//const ejs = require("ejs")
const path = require('path')
const fs = require('fs')
const ficherosEstaticos = path.join(__dirname, "/public");
const bodyparser = require('body-parser')


const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname + "/views"))
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(ficherosEstaticos))



var opciones = [
{
   texto: "Rojo",
   numeroVotos: 0
},
{
   texto: "Azul",
   numeroVotos: 0
},
{
   texto: "Verde",
   numeroVotos: 0
},
{
   texto: "Ninguno de los anteriores",
   numeroVotos: 0
}
];

let array = [ "Edu", "Montse", "Juan", "Enrique"]



app.get("/", function(request,response){
    response.statusCode(200)
})


app.post("/response_question", function(request, response){
    switch(request.body.val){
        case '1': opciones[0].numeroVotos = opciones[0].numeroVotos + 1; break;
        case '2': opciones[1].numeroVotos = opciones[1].numeroVotos + 1; break;
        case '3': opciones[2].numeroVotos = opciones[2].numeroVotos + 1; break;
        case '4': opciones[3].numeroVotos = opciones[3].numeroVotos + 1; break;
    }
    response.render("question_response", {options : opciones})
})

app.get("/usuarios", function(request, response, next){
    response.render("users", {users: array})
})

app.get("/usuarios/:id", function(request, response, next){
    response.render("users", {user: request.params.id})
})

app.post("/usuarios/borrar", function(request, response){
    array.splice(request.body.usId,1)
    response.render("users", {users: array})
})

app.get("/usuarios/borrar/:id", function(request, response){
    array.splice(request.params.id,1)
    response.render("users", {users: array})
})

app.get("/procesar_get", function(request, response) {
    response.end();
});

app.use(middlewareNotFound)
app.use(middlewareServerError)

app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: "
    + err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});

function middlewareNotFound(request,response){
    // Código 404:  Not Found
    response.status(404);
    response.render("error404")
}

function middlewareServerError(err,request,response,next){
    // Código 500: Internal server error
    response.status(500);
    response.render("error500", {
        mensaje: err.message,
        pila: err.stack
    });
}




