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