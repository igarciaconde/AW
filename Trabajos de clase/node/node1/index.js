"use strict";
 
const modul = require('./ejnode')


modul.freplace("ficheroTexto.txt", /\b[0-9]+\b/g, "{numero}", function(err){
  if(err) console.log(err); 
  else console.log("OK");
})

modul.replaceSpaces("ficheroTexto.txt", function(err){
    if(err) console.log(err)
    else console.log("OK")
})



