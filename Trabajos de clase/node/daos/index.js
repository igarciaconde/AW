const DAO = require("./dao")

let usuario2 = {
    nombre: "Iñigo Garcia-Conde",
    correo: "inigogar@ucm.es",
    telefono: "123456789"
}

let usuario1 = {
    nombre: "Eduardo Marinez Martin",
    correo: "eduMarMar@ucm.es",
    telefono: "987654321"
}

let usuario3 = {
    id: "1",
    nombre: "Eduardo Marinez Martin",
    correo: "eduMarMar@ucm.es",
    telefono: "987654321"
}

const dao = new DAO("localhost", "root", "", "mensajeria")

function insert(err) {
    if(err) {
        console.log( err)
    }
    else console.log("Usuario insertado con exito")
}

function bandejaEntrada(err, response) {
    if(err) {
        console.log( err)
    }
    else {
        response.forEach(element => {
            console.log(`${element.mensaje} ${element.hora}`)
        });
    }
}


dao.bandejaEntrada(usuario3, bandejaEntrada)