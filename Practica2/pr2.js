"use strict"

let listaTareas = [
    { text: "Preparar práctica AW", tags: ["AW", "practica"] },
    { text: "Mirar fechas congreso", done: true, tags: [] },
    { text: "Ir al supermercado", tags: ["personal"] },
    { text: "Mudanza", done: false, tags: ["personal"] },
    ];

    
function getToDoTask(tasks){
    
     return tasks.filter( elem => 
        elem.done != true).map( elem => elem.text)
}

function findByTag(tasks, tag) {

    return tasks.filter(elem => 
        elem.tags.includes(tag))
}

function findByTags(tasks,tags) {

    return tasks.filter( elem => 
        elem.tags.some(e => tags.includes(e)))
}

function countDone(tasks) {

    return tasks.filter(elem => 
        elem.done == true).length
}

var tagsE = /@\w+\b/
var textE = /\w+\b/

function createTask(text) {
    let res = new Object()
    res.texto = ""

    var tag = text.match(/@\w+\b/g)
    tag = tag.map(elem => elem.substring(1))
    text = text.replace(/@\w+\b/g, "")
    var t = text.match(/\w+\b/g)
    t.map(elem => res.texto += elem + " ")
    
    
    res.texto = res.texto.slice(0, -1)
    res.tags = tag
    return res
}