// JSoutput = require('./JSoutput.js');

stringify = require('json-stringify-safe')

module.exports = function() {

    var str;

    var outnode = document.getElementById("JSoutput");
    outnode.value = "";

    d = new Date().getTime();

    try {
        eval(document.getElementById("JSprogram").value)
    } catch(e) {
        str = e.name+" at line "+(e.lineNumber-56)+": "+e.message;
    }


// ok but probably dont just dump the X+ML there, instead go through doc and print it nicely ok :-D

      document.getElementById("JSoutput").value = doc.serializeXML()

};
