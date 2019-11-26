"use strict";

class utils{

    getToDoTask(tasks){

    return tasks.filter(elem =>
        elem.done != true).map(elem => elem.text)
    }



    findByTag(tasks, tag) {

        return tasks.filter(elem =>
            elem.tags.includes(tag))
    }

    findByTags(tasks, tags) {

        return tasks.filter(elem =>
            elem.tags.some(e => tags.includes(e)))
    }

    countDone(tasks) {

        return tasks.filter(elem =>
            elem.done == true).length
    }


    createTask(text) {
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

}

module.exports = utils;