// src/components/three/ParticleField.jsx
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 500, color = '#6366f1' }) {
  const mesh = useRef();
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      positions[i * 3] += velocities[i * 3] + Math.sin(t * 0.5 + i) * 0.001;
      positions[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(t * 0.3 + i) * 0.001;
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around boundaries
      if (Math.abs(positions[i * 3]) > 15) positions[i * 3] *= -0.9;
      if (Math.abs(positions[i * 3 + 1]) > 15) positions[i * 3 + 1] *= -0.9;
      if (Math.abs(positions[i * 3 + 2]) > 10) positions[i * 3 + 2] *= -0.9;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = t * 0.01;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

const ParticleField = ({ className = '', count = 300 }) => {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Particles count={count} />
      </Canvas>
    </div>
  );
};

export default ParticleField;
