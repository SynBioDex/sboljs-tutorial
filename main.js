
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

  alert(chap);

})

$("#openbutton").click(function(){

  $("#mySidenav").css('width', '250px');

})


$("#closebutton").click(function(){

  document.getElementById("mySidenav").style.width = "0";


})


function highlight(){

  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

}

readChapter("./Chapters/Chapter2.txt", function() {

    highlight();

});



// readChapter("./Chapter2.txt");
//
// highlight();

// x = window.doc
//
// x_cd = x.componentDefinition('JFIODJFIDS')
//
// x_cd.persistentIdentity = "FJIDOJFIODJOFI"
//
// x_cd.version = '1.0'
//
// x_cd.addType('Protein')
