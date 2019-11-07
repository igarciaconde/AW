"use strict";

const fs = require("fs");
const path = require("path");

function freplace(fichero, buscar, sustituir, callback){
    try {
        let text = fs.readFileSync(fichero, {encoding: "utf-8"})
        let newText = text.replace(buscar, sustituir)
        fs.writeFileSync(fichero, newText, {encoding: "utf-8"})
        callback(null);
    }
    catch(err) {
        callback(err);
    }
};

function replaceSpaces(fichero, callback){
    try {
        let text = fs.readFileSync(fichero, {encoding: "utf-8"});
        var newText = text.replace(/\s+/g, " ");
        fs.writeFileSync(fichero, newText, {encoding: "utf-8"});
        callback(null)
    }catch(err){
        callback(err)
    }
};



module.exports.freplace = freplace
module.exports.replaceSpaces = replaceSpaces