var CodeMirror = require("./codemirror-5.33.0/lib/codemirror");

var javascript = require("./codemirror-5.33.0/mode/javascript/javascript")

var javascript = require("./codemirror-5.33.0/mode/xml/xml")

var myCodeMirror1 = CodeMirror.fromTextArea(document.getElementById("JSprogram"), {
  mode:  "javascript"
});

var myCodeMirror2 = CodeMirror.fromTextArea(document.getElementById("JSoutput"), {
  mode:  "xml"
});


module.exports = {

  myCodeMirror1 : myCodeMirror1,
  myCodeMirror2 : myCodeMirror2

};
