// src/components/3d/NeuralConstellation.jsx
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ConstellationParticles({ count = 350 }) {
  const pointsRef = useRef();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;

      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const array = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      array[i * 3] += velocities[i * 3] + Math.sin(time * 0.4 + i) * 0.001;
      array[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(time * 0.3 + i) * 0.001;
      array[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(array[i * 3]) > 14) array[i * 3] *= -0.95;
      if (Math.abs(array[i * 3 + 1]) > 14) array[i * 3 + 1] *= -0.95;
      if (Math.abs(array[i * 3 + 2]) > 9) array[i * 3 + 2] *= -0.95;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = Math.sin(time * 0.02) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#00f0ff"
        transparent
        opacity={0.5}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

const NeuralConstellation = ({ className = '', count = 280 }) => {
  return (
    <div className={`fixed inset-0 -z-10 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <ConstellationParticles count={count} />
      </Canvas>
    </div>
  );
};

export default NeuralConstellation;
