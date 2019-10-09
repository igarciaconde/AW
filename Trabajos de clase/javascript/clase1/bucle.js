"use strict"



function type(a) {
    console.log(typeof(a))
}

function typeO(a) {
    if( a instanceof Array)
        console.log(a + " es un array")
    else console.log(a + " no es un array")
}

function typeObj(a){
    if ( a instanceof Object)
        console.log(a)
    else console.log(" primitive - " + typeof(a))
}

function printObj(x){
    var sum = 0
    for(var j=0; j < Object.keys(x).length; j++){
        sum++
    }
    console.log("Numero de propiedades: " + sum)
    for(var prop in x){
        console.log(`${prop}: ${x[prop]}`)
    }
}

function createObj(x,p){
    for(var i=0; i < x.lenght ;i++){
        Object.definePropertie(p, "jesus",{
            value : "aa"
        })
    }
    console.log(p)
    printObj(p)
}

var x = 8
var y = "hola"
var z = [1,2,3,4]
var hola ={
     alto:10,
     bajo:12
}
var obj = ["nombre", "apellido"]

type(x)
type(y)
type(z)
typeO(x)
typeO(z)
typeObj(hola)
printObj(hola)
createObj(obj,hola)