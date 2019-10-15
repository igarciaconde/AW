"use strict"


function mapLengths(x) {
    var arg = x
    var arr = []

    for (let index = 0; index < arg.length; index++) {
        var now = arg[index]
        arr.push(now.length)
    }
    
    return arr
}

function filterinf(x) {
    var arg = x
    var arr = []
    var limit = arg.length/2

    for (let index = 0; index < limit; index++) {
        arr.push(arg[index])
    }
   
    return arr
}

function everyFunction(x) {
    var arg = x
    var valid = true

    for (let index = 0; index < arg.length; index++) {
        if(x instanceof Function)
            valid = false
    }
    
    return valid
}

function someUndefined(x) {
    var arg = x
    var valid = true

    for (let index = 0; index < arg.length; index++) {
        if(typeof(arg[index]) == undefined)
            valid = false
    }
    
    return valid
}

function globalSquare(x) {
    var arg = x
    var total = 0

    for (let index = 0; index < arg.length; index++) {
        total = total + arg[index]*arg[index]
    }
    
    return total
}

function exampleforE() {
    var personas = []
    personas.forEach((v,i,a) => {
        //aqui hacemos cositas
    })
}

function mapLengths2(x) { 
    return x.map(x => x = x.length)
}

function filterinf2(x) {
    return x.filter(function(v,i,a) { return i < a.length/2})
}

function everyFunction2(x){
    return x.every(x => x instanceof Function)
}

function someUndefined2(x){
    return x.some(x => typeof(x) === undefined)
}

function reduceSquare2(x){
    return x.reduce(function(ac,n))
}




    