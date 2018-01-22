
SBOLDocument = require('sboljs');

window.doc = new SBOLDocument();

console.log(window.doc)

var JSrun = require('./JSrun.js');

document.getElementById('run').addEventListener('click', function() {
  console.log('clicked run')
  JSrun()
})

// x = window.doc
//
// x_cd = x.componentDefinition('JFIODJFIDS')
//
// x_cd.persistentIdentity = "FJIDOJFIODJOFI"
//
// x_cd.version = '1.0'
//
// x_cd.addType('Protein')
