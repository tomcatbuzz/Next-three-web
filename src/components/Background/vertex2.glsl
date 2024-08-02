uniform float uTime;
varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;
uniform vec2 pixels;
float PI = 3.141592653589793238;
void main() {
  vUv = uv;
  vNormal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
