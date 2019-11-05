const DAO = require("./dao");

const daoMensajeria = new DAO("localhost", "root", "", "mensajeria");

// Creación de usuarios
// ---------------------------------------------------------------------------------------
let usuario1 = {
    id: 47,
    nombre: "Eduardo",
    correo: "edu@gmail.com",
    telefono: "91333555"
};
let usuario2 = {
    id: 48,
    nombre: "Carlos",
    correo: "carlos@gmail.com",
    telefono: "91333555"
};


// Definición de las funciones callback
// ---------------------------------------------------------------------------------------
function cb_insert(err){
    if (err) {
    console.log("Error al insertar el usuario");
    } else {
    console.log("Usuario insertado con exito");
    }
}

function cb_enviarMensaje(err){

  if (err) {
    console.log(`Error al insertar el mensaje`);
    } else {
    console.log(`Mensaje insertado con exito`);
    }
}


function cb_bandejaEntrada(err, response) {
    if(err) {
        console.log(err)
    }
    else {
        response.forEach(element => {
            console.log(`${element.mensaje} ${element.hora}`)
        });
    }
}

function cb_buscarUsuario(err, response) {
    if(err) {
        console.log(err)
    }
    else {
        response.forEach(element => {
            console.log(`${element.nombre}`)
        });
    }
}

// LLamadas a los métodos de DAO para insertar usuarios, enviar mensajes, etc
// ---------------------------------------------------------------------------------------
daoMensajeria.insertarUsuario(usuario1,cb_insert);
daoMensajeria.insertarUsuario(usuario2,cb_insert);
daoMensajeria.enviarMensaje(usuario1, usuario2, "Que pasa hermano", cb_enviarMensaje);
daoMensajeria.bandejaEntrada(usuario2, cb_bandejaEntrada);
daoMensajeria.buscarUsuario("car", cb_buscarUsuario);

