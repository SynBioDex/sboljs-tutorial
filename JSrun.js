JSoutput = require('./JSoutput.js');

module.exports.JSrun = function() {
    var str;
    var outnode = document.getElementById("JSoutput");
    outnode.value = "";x = 2
    d = new Date().getTime();
    try {
        with (Math) {
            str = JSoutput(eval(document.getElementById("JSprogram").value));
        }
    } catch(e) {
        str = e.name+" at line "+(e.lineNumber-56)+": "+e.message;
    }
    var tnode = document.getElementById("JStiming");
    tnode.innerHTML = ""+(new Date().getTime()-d)/1000;
    if (str != undefined) {outnode.value += str;}
};
