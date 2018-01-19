var rdf = require('rdf-graph-abstract')
var util = require('util')

rdf.NamedNode = function (iri) {
  this.interfaceName = 'NamedNode'
  this.nominalValue = iri
}

rdf.NamedNode.prototype.equals = function (other) {
  if (typeof other === 'string') {
    return this.nominalValue === other
  }

  if (typeof other === 'object') {
    if (other.constructor.name === 'RegExp') {
      return other.test(this.nominalValue)
    }

    if (other.interfaceName === this.interfaceName) {
      return this.nominalValue === other.nominalValue
    }
  }

  return false
}

rdf.NamedNode.prototype.toNT = function () {
  return '<' + rdf.encodeString(this.nominalValue) + '>'
}

rdf.NamedNode.prototype.toString = function () {
  return this.nominalValue
}

rdf.NamedNode.prototype.valueOf = function () {
  return this.nominalValue
}

rdf.BlankNode = function () {
  this.interfaceName = 'BlankNode'
  this.nominalValue = 'b' + (++rdf.BlankNode.nextId)
}

rdf.BlankNode.prototype.equals = function (other) {
  if (typeof other === 'string') {
    return this.nominalValue === other
  }

  if (typeof other === 'object') {
    if (other.constructor.name === 'RegExp') {
      return other.test(this.nominalValue)
    }

    if (other.interfaceName === this.interfaceName) {
      return this.nominalValue === other.nominalValue
    }
  }

  return false
}

rdf.BlankNode.prototype.toNT = function () {
  return '_:' + rdf.encodeString(this.nominalValue)
}

rdf.BlankNode.prototype.toString = function () {
  return '_:' + this.nominalValue
}

rdf.BlankNode.prototype.valueOf = function () {
  return this.nominalValue
}

rdf.BlankNode.nextId = 0

rdf.Literal = function (value, language, datatype, native) {
  this.interfaceName = 'Literal'
  this.nominalValue = value

  if (language) {
    this.language = language
    this.datatype = rdf.Literal.langString
  } else {
    this.language = null

    if (datatype) {
      this.datatype = new rdf.NamedNode(datatype.toString())
    } else {
      this.datatype = rdf.Literal.string
    }
  }

  this.native = native
}

rdf.Literal.prototype.equals = function (other) {
  if (typeof other === 'string') {
    return this.nominalValue === other
  }

  if (typeof other === 'object') {
    if (other.constructor.name === 'RegExp') {
      return other.test(this.nominalValue)
    }

    if (other.interfaceName === this.interfaceName) {
      if (this.nominalValue.toString() !== other.nominalValue.toString()) {
        return false
      }

      if (this.language !== other.language) {
        return false
      }

      if ((this.datatype && !this.datatype.equals(other.datatype))) {
        return false
      }

      return true
    }
  }

  return false
}

rdf.Literal.prototype.toNT = function () {
  var string = '"' + rdf.encodeString(this.nominalValue.toString()) + '"'

  if (this.language) {
    string += '@' + this.language
  }

  if (this.datatype && !rdf.Literal.string.equals(this.datatype) && !rdf.Literal.langString.equals(this.datatype)) {
    string += '^^' + this.datatype.toNT()
  }

  return string
}

rdf.Literal.prototype.toString = function () {
  return this.nominalValue
}

rdf.Literal.langString = new rdf.NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
rdf.Literal.string = new rdf.NamedNode('http://www.w3.org/2001/XMLSchema#string')

rdf.Triple = function (subject, predicate, object) {
  this.subject = subject
  this.predicate = predicate
  this.object = object
}

rdf.Triple.prototype.equals = function (other) {
  return this.subject.equals(other.subject) && this.predicate.equals(other.predicate) && this.object.equals(other.object)
}

rdf.Triple.prototype.toNT = function () {
  return this.toString()
}

rdf.Triple.prototype.toQuad = function (graph) {
  return new rdf.Quad(this.subject, this.predicate, this.object, graph)
}

rdf.Triple.prototype.toString = function () {
  return this.subject.toNT() + ' ' + this.predicate.toNT() + ' ' + this.object.toNT() + ' .'
}

rdf.Quad = function (subject, predicate, object, graph) {
  this.subject = subject
  this.predicate = predicate
  this.object = object
  this.graph = graph
}

rdf.Quad.prototype.equals = function (other) {
  return this.subject.equals(other.subject) && this.predicate.equals(other.predicate) && this.object.equals(other.object) && this.graph.equals(other.graph)
}

rdf.Quad.prototype.toNT = function () {
  return this.toString()
}

rdf.Quad.prototype.toString = function () {
  return this.subject.toNT() + ' ' + this.predicate.toNT() + ' ' + this.object.toNT() + ' ' + this.graph.toNT() + ' .'
}

rdf.Quad.prototype.toTriple = function () {
  return new rdf.Triple(this.subject, this.predicate, this.object)
}

rdf.Graph = function (other) {
  this.actions = []

  this._graph = []

  this._gspo = {}
  this._gops = {}

  rdf.AbstractGraph.call(this, rdf.Graph, other)
}

util.inherits(rdf.Graph, rdf.AbstractGraph)

rdf.Graph.prototype.add = function (quad) {
  var i = rdf.Graph.index(quad)

  this._gspo[i.g] = this._gspo[i.g] || {}
  this._gspo[i.g][i.s] = this._gspo[i.g][i.s] || {}
  this._gspo[i.g][i.s][i.p] = this._gspo[i.g][i.s][i.p] || {}

  this._gops[i.g] = this._gops[i.g] || {}
  this._gops[i.g][i.o] = this._gops[i.g][i.o] || {}
  this._gops[i.g][i.o][i.p] = this._gops[i.g][i.o][i.p] || {}

  if (!this._gspo[i.g][i.s][i.p][i.o]) {
    this._gspo[i.g][i.s][i.p][i.o] = quad
    this._gops[i.g][i.o][i.p][i.s] = quad
    this._graph.push(quad)
    this.actions.forEach(function (action) {
      action.run(quad)
    })
  }

  return this
}

rdf.Graph.prototype.addAction = function (action) {
  // TODO: implement me
}

rdf.Graph.prototype.remove = function (quad) {
  var i = rdf.Graph.index(quad)

  if (this._gspo[i.g][i.s][i.p][i.o]) {
    delete this._gspo[i.g][i.s][i.p][i.o]
    delete this._gops[i.g][i.o][i.p][i.s]
    this._graph.splice(this._graph.indexOf(quad), 1)
  }
}

rdf.Graph.prototype.toArray = function () {
  return this._graph.slice(0)
}

rdf.Graph.index = function (quad) {
  return {
    g: quad.graph ? quad.graph.toString() : null,
    s: quad.subject.toString(),
    p: quad.predicate.toString(),
    o: quad.object.toString()
  }
}

function objValues(obj) {

    return Object.keys(obj).map((key) => obj[key])

}

rdf.Graph.prototype.match = function (subject, predicate, object, graph) {

  var g = graph ? graph.toString() : null
  var s = subject ? subject.toString() : null
  var p = predicate ? predicate.toString() : null
  var o = object ? object.toString() : null

  if(g === '[object Object]')
      throw new Error('g not a uri?')

  if(s === '[object Object]')
      throw new Error('s not a uri?')

  if(p === '[object Object]')
      throw new Error('p not a uri?')

  if(o === '[object Object]')
      throw new Error('o not a uri?') 

  if(s && p && o) {

      var gIdx = this._gspo[g]

      if(!gIdx)
          return new rdf.Graph()

      var sIdx = gIdx[s]

      if(!sIdx)
          return new rdf.Graph()

      var pIdx = sIdx[p]

      if(!pIdx)
          return new rdf.Graph()

      var quad = pIdx[o]

      if(quad)
          return new rdf.Graph([ quad ])

      return new rdf.Graph()
  }

  if(s && p && !o) {

      var gIdx = this._gspo[g]

      if(!gIdx)
          return new rdf.Graph()

      var sIdx = gIdx[s]

      if(!sIdx)
          return new rdf.Graph()

      var pIdx = sIdx[p]

      if(!pIdx)
          return new rdf.Graph()

      return new rdf.Graph(objValues(pIdx))
  }

  if(!s && p && o) {

      var gIdx = this._gops[g]

      if(!gIdx)
          return new rdf.Graph()

      var oIdx = gIdx[o]

      if(!oIdx)
          return new rdf.Graph()

      var pIdx = oIdx[p]

      if(!pIdx)
          return new rdf.Graph()

      return new rdf.Graph(objValues(pIdx))
  }

  if(s && !p && !o) {

      var gIdx = this._gspo[g]

      if(!gIdx)
          return new rdf.Graph()

      var sIdx = gIdx[s]

      if(!sIdx)
          return new rdf.Graph()

      return new rdf.Graph([].concat.apply([], objValues(sIdx).map(objValues)))
  }

  var results = new rdf.Graph(this.toArray().filter(function (quad) {
    if (graph && (!quad.graph || !quad.graph.equals(graph))) {
      return false
    }

    if (subject && !quad.subject.equals(subject)) {
      return false
    }

    if (predicate && !quad.predicate.equals(predicate)) {
      return false
    }

    if (object && !quad.object.equals(object)) {
      return false
    }

    return true
  }))

  //console.warn('slow lookup: { ' + s + ', ' + p + ', ' + o + '} [' + results.toArray().length + ' matches]')

  return results

}
module.exports = rdf
