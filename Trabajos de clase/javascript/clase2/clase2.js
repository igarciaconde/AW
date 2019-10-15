"use strict"

var funcs = [ x => x + 1, y => y + 2, z => z * 2]

function secuence(a,funcs) {
    var sol = a
    var funcs = arguments[1]
    for (let index = 0; index < funcs.length; index++) {
        sol = funcs[index](sol)
    }
    console.log(sol)
}

function secuence2(a,funcs) {
    var sol = a
    var funcs = arguments[1]
    for (let index = 0; index < funcs.length; index++) {
        if(typeof(sol) == undefined)
            break
        else sol = funcs[index](sol)
    }
    console.log(sol)
}

function secuence3(a,funcs, right = false) {
    var sol = 1
    var funcs = arguments[1]
    if(right){
        for (let index = funcs.length-1; index >= 0; index--) {
            if(typeof(sol) == undefined)
                break
            else sol = funcs[index](sol)
        }
    }else{
        for (let index = 0; index < funcs.length; index++) {
            if(typeof(sol) == undefined)
                break
            else sol = funcs[index](sol)
        }
    }
    
    console.log(sol)
}

function pluck(objects, fieldName) {
    var response = "["
    for (let index = 0; index < objects.length; index++) {
        response += searchIn(objects[index]) + ","
    }
    console.log(response + "]")
}

function searchIn(object, fieldName) {
    var element = ""
    for (const key in object) {
        if ( key.toString === fieldName) {
            console.log(key.toString)
            element = `${object[key]}`;
        }
    }
    return element
}

var obj = [ 
    {nombre: "Ricardo", edad: 63},
    {nombre: "Paco", edad: 55},
    {nombre: "Enrique", edad: 32},
    {nombre: "Adrían", edad: 34},
    {apellidos: "García", edad: 28}
]

pluck(obj, "nombre")
pluck(obj, "edad")
pluck(obj, "email")