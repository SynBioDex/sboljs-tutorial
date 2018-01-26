var CodeMirror = require("./codemirror-5.33.0/lib/codemirror");

var javascript = require("./codemirror-5.33.0/mode/javascript/javascript")

var javascript = require("./codemirror-5.33.0/mode/xml/xml")

var fullScreen = require("./codemirror-5.33.0/addon/display/fullscreen")

require("./codemirror-5.33.0/addon/display/placeholder")
require("./codemirror-5.33.0/addon/selection/active-line.js")

var myCodeMirror1 = CodeMirror.fromTextArea(document.getElementById("JSprogram"), {
  mode: "javascript",
  theme: "monokai",
  lineNumbers: true,
  styleActiveLine: true,
  extraKeys: {
    "F11": function(cm) {
      cm.setOption("fullScreen", !cm.getOption("fullScreen"));
    },
    "Esc": function(cm) {
      if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
    }
  }

});

var myCodeMirror2 = CodeMirror.fromTextArea(document.getElementById("JSoutput"), {
  mode:  "xml",
  theme: "monokai",
  readOnly: true
});


module.exports = {

  myCodeMirror1 : myCodeMirror1,
  myCodeMirror2 : myCodeMirror2

};
