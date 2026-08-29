// src/components/three/HeroScene.jsx
import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, rotation, scale, speed = 1, distort = 0.3, color = '#6366f1' }) {
  const meshRef = useRef();
  const initialRotation = useRef(rotation || [0, 0, 0]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = initialRotation.current[0] + t * 0.2;
    meshRef.current.rotation.y = initialRotation.current[1] + t * 0.3;
    meshRef.current.rotation.z = initialRotation.current[2] + t * 0.1;
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function GlassSphere({ position, scale }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });

  return (
    <Float speed={1.5} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleCloud({ count = 200 }) {
  const points = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function MouseLight() {
  const light = useRef();
  const { viewport } = useThree();

  useFrame((state) => {
    if (!light.current) return;
    light.current.position.x = (state.pointer.x * viewport.width) / 2;
    light.current.position.y = (state.pointer.y * viewport.height) / 2;
  });

  return <pointLight ref={light} intensity={2} color="#22d3ee" distance={8} />;
}

const HeroScene = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} color="#6366f1" />
          <directionalLight position={[-3, -3, 2]} intensity={0.3} color="#22d3ee" />
          <MouseLight />

          {/* Shapes */}
          <FloatingShape
            position={[3, 1.5, -2]}
            rotation={[0.5, 0.3, 0]}
            scale={0.8}
            speed={0.8}
            distort={0.4}
            color="#6366f1"
          />
          <FloatingShape
            position={[-3.5, -1, -1]}
            rotation={[1, 0.5, 0.3]}
            scale={0.6}
            speed={1.2}
            distort={0.3}
            color="#8b5cf6"
          />
          <FloatingShape
            position={[1, -2.5, -3]}
            rotation={[0.3, 1, 0.5]}
            scale={0.5}
            speed={0.6}
            distort={0.5}
            color="#22d3ee"
          />
          <GlassSphere position={[-1.5, 2, -2]} scale={0.7} />

          {/* Particles */}
          <ParticleCloud count={150} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
