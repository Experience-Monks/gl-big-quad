var createBuffer = require('gl-buffer')
var createVAO = require('gl-vao')

module.exports = GLBigQuad

function GLBigQuad (gl) {
  if (!(this instanceof GLBigQuad)) {
    return new GLBigQuad(gl)
  }

  this.gl = gl
  this.vao = createVAO(gl, [{
    size: 2,
    type: gl.FLOAT,
    buffer: createBuffer(gl, new Float32Array([
      -1, -1,  +1, +1,  -1, +1,
      -1, -1,  +1, -1,  +1, +1
    ]))
  }])
}

GLBigQuad.prototype.bind = function () {
  this.vao.bind()
}

GLBigQuad.prototype.draw = function () {
  this.gl.drawArrays(this.gl.TRIANGLES, 0, 6)
}

GLBigQuad.prototype.unbind = function () {
  this.vao.unbind()
}
