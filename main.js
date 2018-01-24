SBOLDocument = require('sboljs');
var $ = require('jquery');
var terminals = require('./terminals');
var readChapter = require('./readChapter')

var hljs = require('highlight.js');

window.doc = new SBOLDocument();

console.log(window.doc);

var JSrun = require('./JSrun.js');

document.getElementById('run').addEventListener('click', function() {
  console.log('clicked run')
  JSrun()
});

$("#resetDoc").click(function(){
  window.doc = new SBOLDocument();
  terminals.myCodeMirror2.setValue('')

});

$(".chap").click(function(){

  var chap = this.id.substr(-1);

  var file = "";

  if (chap == "w"){

    file = "./Chapters/Overview.txt";

  }

  else{

    file = "./Chapters/Chapter" + chap + ".txt"

  }

  readChapter(file, function() {

    highlight();

  });

})

$("#openbutton").click(function(){

  $("#mySidenav").css('width', '5%');

})


$("#closebutton").click(function(){

  document.getElementById("mySidenav").style.width = "0";


})


function highlight(){

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

}

highlight();
