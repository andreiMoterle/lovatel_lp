import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const GLSL_COMMON = `
  varying vec2 vUv;
  uniform float uTime;
`

const WavePlane = () => {
  const meshRef = useRef()

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#ffffff') }, // Background mix
    uColor2: { value: new THREE.Color('#584a89') }, // Brand Purple
  }), [])

  useFrame((state) => {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime * 0.5
  })

  return (
    <mesh ref={meshRef} rotation={[-1.1, 0, 0]} position={[0, -3, -2]}>
      <planeGeometry args={[60, 40, 256, 256]} />
      <shaderMaterial
        vertexShader={`
          ${GLSL_COMMON}
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Complex wave movement
            float wave1 = sin(pos.x * 0.4 + uTime) * cos(pos.y * 0.2 + uTime * 0.5);
            float wave2 = sin(pos.y * 0.3 - uTime * 0.8) * 0.5;
            float wave3 = sin(length(pos.xy) * 0.1 + uTime) * 0.3;
            
            pos.z += (wave1 + wave2 + wave3) * 2.5;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          ${GLSL_COMMON}
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          void main() {
            // Fine line effect
            float brightness = sin(vUv.y * 100.0 + uTime * 5.0) * 0.5 + 0.5;
            brightness *= sin(vUv.x * 80.0 - uTime * 3.0) * 0.5 + 0.5;
            
            // Mask to fade edges
            float mask = smoothstep(0.5, 0.0, length(vUv - 0.5));
            
            vec3 color = mix(uColor1, uColor2, vUv.x + 0.2 * sin(uTime));
            
            gl_FragColor = vec4(color, brightness * mask * 0.2);
          }
        `}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

const WaveBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-bg-dark pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
        <WavePlane />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>
    </div>
  )
}

export default WaveBackground
