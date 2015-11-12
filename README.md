# gl-big-quad

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Draws a big quad to the screen. A useful means of drawing a small number of 2D sprites with custom shaders to the screen without having to resort to more complex approaches such as [sprite batching](https://github.com/mattdesl/gl-sprite-batch). Doing so with [gl-big-triangle](https://github.com/Jam3/gl-big-triangle) requires changing the viewport repeatedly and as such is ineffective.

## Usage

[![NPM](https://nodei.co/npm/gl-big-quad.png)](https://www.npmjs.com/package/gl-big-quad)

### `quad = Quad(gl)`

Takes a `WebGLRenderingContext` and creates a new instance of `gl-big-quad`.

``` javascript
const Quad = require('gl-big-quad')

const canvas = document.createElement('canvas')
const gl = canvas.getContext('webgl')
const quad = Quad(gl)
```

### `quad.bind()`

Binds the quad's VAO. Must be called at least once before `quad.draw`.

### `quad.draw()`

Draws the big quad to the screen using the currently bound shader.

``` javascript
const Shader = require('gl-shader')
const raf = require('raf')

const vert = `
precision mediump float;

attribute vec2 position;
varying vec2 uv;

void main() {
  uv = position;

  vec2 lo = vec2(-0.5);
  vec2 hi = vec2(+0.5);

  gl_Position = vec4(mix(lo, hi, position), 1, 1);
}
`

const frag = `
precision mediump float;

varying vec2 uv;

void main() {
  gl_FragColor = vec4(uv * 0.5 + 0.5, 1, 1);
}
`

const shader = Shader(gl, vert, frag)

render()
function render () {
  shader.bind()
  quad.bind()
  quad.draw()

  // Render again in the next frame
  raf(render)
}
```

### `quad.unbind()`

Unbinds the quad's VAO. You should call this when you're finished drawing big quads, however it's not necessary if you're using [gl-vao](https://github.com/stackgl/gl-vao) or [gl-geometry](https://github.com/stackgl/gl-geometry) for binding your attribute data or *only* drawing big quads.

## See Also

* [a-big-triangle](https://github.com/mikolalysenko/a-big-triangle)
* [gl-big-triangle](https://github.com/Jam3/gl-big-triangle)
* [gl-sprite-batch](https://github.com/mattdesl/gl-sprite-batch)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/gl-big-quad/blob/master/LICENSE.md) for details.
