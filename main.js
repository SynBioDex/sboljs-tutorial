

window.doc = require('./test.js');

var JSrun = require('./JSrun.js');

document.getElementById('run').addEventListener('click', function() {
  console.log('clicked run')
  JSrun()
})

// circuit = docum.componentDefinition('DUAIDHSAIDOSA');
//
// circuit.displayId = 'testid';
//
// console.log(circuit)
