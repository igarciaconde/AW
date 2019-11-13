"use strict"

const express = require("express")
const ejs = require("ejs")
const path = require('path')

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname + "views"))

app.get("/", function(request, response){
    response.sendFile(path.join(__dirname, "public", "index.html"))
})

var usuarios = ["Javier Montoro", "Dolores Vega", "Beatriz Nito"];

app.get("/users.html", function(request, response){
    response.status(200)
    response.render("users", {user :usuarios});
})

app.listen(3000, function(err) {
    if (err) {
    console.error("No se pudo inicializar el servidor: "
    + err.message);
    } else {
    console.log("Servidor arrancado en el puerto 3000");
    }
});