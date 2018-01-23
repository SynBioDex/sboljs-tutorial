var $ = require('jquery');
var terminals = require('./terminals');

module.exports = function() {

    var str;

    $("#JSoutput").val('');

    d = new Date().getTime();

    try {
        eval(terminals.myCodeMirror1.getValue())
        eval()
    } catch(e) {
        str = e.name+" at line "+(e.lineNumber-56)+": "+e.message;
    }


// ok but probably dont just dump the X+ML there, instead go through doc and print it nicely ok :-D

      // document.getElementById("JSoutput").value = doc.serializeXML()

      terminals.myCodeMirror2.setValue(doc.serializeXML());

};
