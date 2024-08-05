// #pragma glslify: fbm3d = require('glsl-fractal-brownian-noise/3d');


//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//

// https://github.com/hughsk/glsl-noise/blob/master/simplex/2d.glsl

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289(((x*34.0)+1.0)*x);
}

float snoise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
// End of Simplex Noise Code


    // uniform float time;
    uniform vec4 uResolution;
    varying vec2 vUv;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uBg;
    uniform float uTime;
    uniform vec2 uMouse;
    
    void main() {
      vec3 color = uBg;

      // waves only 
      // float frequency = 5.0;
      // float speed = 0.1;
      // float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
      // float radius = length(vUv - 0.5);
      // float noise1 = snoise(vec2(angle * frequency + uTime * speed, radius * frequency));
      // float noise2 = snoise(vec2(angle * frequency - uTime * speed, radius * frequency));

      // mouse effects
      // float mouseEffect = 0.0001;
      // float waveFrequency = 5.0;
      // float noise1 = snoise(vUv * waveFrequency + uTime / 10. * (sin(uMouse.x * mouseEffect) + 0.2));
      // float noise2 = snoise(vUv * waveFrequency + uTime / 10. * (sin(uMouse.y * mouseEffect) + 0.2));

      // // original mouse code for reference
      float noise1 = snoise(vUv + uTime / 10. * (sin(uMouse.x * .001) + 0.2));
      float noise2 = snoise(vUv + uTime / 10. * (sin(uMouse.y * .001) + 0.2));

      // color = mix(color, uColorA, noise1);
      // color = mix(color, uColorB, noise2);

      // Slow down overall movement and reduce mouse influence
    float slowTime = uTime * 0.5;
    vec2 mousePos = uMouse.xy / uResolution.xy;
    // float mouseDist = length(vUv - mousePos);
    float mouseInfluence = 0.02;
    // float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.1;

    
    // Create softer, slower waves
    // float waveFrequency = 2.0; // Reduce this for larger, softer waves
    // float waveSpeed = 1.5; // Reduce this for slower wave movement
    
    // Combine time, mouse, and UV for wave effect
    // vec2 waveOffset = vec2(
    //     sin(slowTime * waveSpeed + uMouse.x * mouseInfluence) * 0.1,
    //     cos(slowTime * waveSpeed + uMouse.y * mouseInfluence) * 0.1
    // );

    // vec2 distortedUV = vUv + vec2(
    //     sin(slowTime + vUv.x * 2.0) * 0.02,
    //     cos(slowTime + vUv.y * 2.0) * 0.02
    // ) + (mousePos - 0.5) * mouseInfluence;

    // vec2 totalOffset = waveOffset += (vUv - mousePos) * mouseInfluence;
    // Generate noise for color mixing
    // float noise1 = snoise(distortedUV * waveFrequency + slowTime);
    // float noise2 = snoise(distortedUV * waveFrequency - slowTime + vec2(0.5));

    // Soften the color mixing
    // float mixFactor1 = smoothstep(0.0, 1.0, noise1 * 0.5 + 0.5);
    // float mixFactor2 = smoothstep(0.0, 1.0, noise2 * 0.5 + 0.5);

    // color = mix(color, uColorA, mixFactor1);
    // color = mix(color, uColorB, mixFactor2);


    // original running color mix
    color = mix(color, uColorA, noise1);
    color = mix(color, uColorB, noise2);
      gl_FragColor = vec4(color, 1.0);
    }
    