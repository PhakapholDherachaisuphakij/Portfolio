// src/components/3d/QuantumCore.jsx
import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function HologramCore() {
  const meshRef = useRef();
  const outerTorusRef = useRef();
  const innerTorusRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pointer = state.pointer;

    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3 + pointer.y * 0.5;
      meshRef.current.rotation.y = t * 0.4 + pointer.x * 0.5;
    }

    if (outerTorusRef.current) {
      outerTorusRef.current.rotation.x = t * 0.2;
      outerTorusRef.current.rotation.y = -t * 0.3;
      outerTorusRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }

    if (innerTorusRef.current) {
      innerTorusRef.current.rotation.x = -t * 0.4;
      innerTorusRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <group>
        {/* Core Distorted Icosahedron */}
        <mesh ref={meshRef} scale={1.2}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshDistortMaterial
            color="#6366f1"
            emissive="#4f46e5"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.9}
            distort={0.45}
            speed={2.5}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Outer Orbital Wireframe Torus */}
        <mesh ref={outerTorusRef} scale={2.2}>
          <torusGeometry args={[1, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.8}
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Inner Counter-Rotating Ring */}
        <mesh ref={innerTorusRef} scale={1.8}>
          <torusGeometry args={[1, 0.02, 16, 80]} />
          <meshStandardMaterial
            color="#7000ff"
            emissive="#7000ff"
            emissiveIntensity={0.7}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      </group>
    </Float>
  );
}

function MouseTrackerLight() {
  const lightRef = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!lightRef.current) return;
    const targetX = (state.pointer.x * viewport.width) / 2;
    const targetY = (state.pointer.y * viewport.height) / 2;
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, targetX, 0.1);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, targetY, 0.1);
  });

  return <pointLight ref={lightRef} intensity={3} color="#00f0ff" distance={8} position={[0, 0, 3]} />;
}

const QuantumCore = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 5, 4]} intensity={1} color="#6366f1" />
          <directionalLight position={[-4, -3, 2]} intensity={0.8} color="#00f0ff" />
          <pointLight position={[0, 0, -2]} intensity={2} color="#7000ff" />
          <MouseTrackerLight />

          <HologramCore />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default QuantumCore;
