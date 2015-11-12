const Context = require('gl-context')
const Shader = require('gl-shader')
const glslify = require('glslify')
const fit = require('canvas-fit')
const Quad = require('../')

const canvas = document.body.appendChild(document.createElement('canvas'))
const gl = Context(canvas, render)

const quad = Quad(gl)
const shader = Shader(gl
  , glslify('./demo.vert')
  , glslify('./demo.frag')
)

function render () {
  const width = gl.drawingBufferWidth
  const height = gl.drawingBufferHeight

  gl.viewport(0, 0, width, height)
  gl.clearColor(1, 1, 0.5, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  shader.bind()
  quad.bind()
  quad.draw()
}

window.addEventListener('resize'
  , fit(canvas)
  , false
)
