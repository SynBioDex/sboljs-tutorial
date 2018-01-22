
SBOLDocument = require('sboljs');
var $ = require('jquery');


window.doc = new SBOLDocument();

console.log(window.doc);

var JSrun = require('./JSrun.js');

document.getElementById('run').addEventListener('click', function() {
  console.log('clicked run')
  JSrun()
});

$("#resetDoc").click(function(){
  window.doc = new SBOLDocument();
  $("#JSoutput").val('');

});

$(".chap").click(function(){

  var chap = this.id.substr(-1);

  alert(chap);


})

//
// $(document).ready(function() {
//
//   $('pre code').each(function(i, block) {
//     hljs.highlightBlock(block);
//   });
// });


// x = window.doc
//
// x_cd = x.componentDefinition('JFIODJFIDS')
//
// x_cd.persistentIdentity = "FJIDOJFIODJOFI"
//
// x_cd.version = '1.0'
//
// x_cd.addType('Protein')
