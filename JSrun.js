// JSoutput = require('./JSoutput.js');

stringify = require('json-stringify-safe')
var $ = require('jquery');

module.exports = function() {

    var str;

    $("#JSoutput").val('');

    d = new Date().getTime();

    try {
        eval(myCodeMirror1.getValue())
        eval()
    } catch(e) {
        str = e.name+" at line "+(e.lineNumber-56)+": "+e.message;
    }


// ok but probably dont just dump the X+ML there, instead go through doc and print it nicely ok :-D

      // document.getElementById("JSoutput").value = doc.serializeXML()

      myCodeMirror2.setValue(doc.serializeXML());

};
