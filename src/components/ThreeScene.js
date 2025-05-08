'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';

function AnimatedSphere({ position, color }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 2) / 4;
    meshRef.current.rotation.y = Math.sin(t / 3) / 4;
    meshRef.current.position.z = Math.sin(t) / 8;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? 1.6 : 1.3}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color={color}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.5}
        />
      </Sphere>
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Stars radius={10} depth={50} count={5000} factor={4} fade speed={1} />

        <AnimatedSphere position={[-3, 0, 0]} color="#6366f1" />
        <AnimatedSphere position={[3, 0, 0]} color="#ec4899" />

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}