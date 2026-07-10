import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, Icosahedron, Torus, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Define a type for our floating shapes
type ShapeData = {
  id: number;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  type: 'sphere' | 'icosahedron' | 'torus';
  floatSpeed: number;
  floatIntensity: number;
  floatRotation: number;
};

// Generates random shapes for the background
const generateShapes = (count: number): ShapeData[] => {
  const colors = ['#0891b2', '#8b5cf6', '#3b82f6', '#2dd4bf']; // Cyan, Purple, Blue, Teal
  const types: ('sphere' | 'icosahedron' | 'torus')[] = ['sphere', 'icosahedron', 'torus'];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 20, 
      (Math.random() - 0.5) * 15, 
      (Math.random() - 0.5) * 10 - 5
    ],
    rotation: [
      Math.random() * Math.PI, 
      Math.random() * Math.PI, 
      0
    ],
    scale: Math.random() * 0.5 + 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    type: types[Math.floor(Math.random() * types.length)],
    floatSpeed: Math.random() * 2 + 1,
    floatIntensity: Math.random() * 2 + 1,
    floatRotation: Math.random() * 0.5 + 0.1,
  }));
};

const ShapeObject = ({ data }: { data: ShapeData }) => {
  const materialProps = {
    color: data.color,
    roughness: 0.1,
    metalness: 0.8,
    envMapIntensity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.2,
  };

  return (
    <Float
      speed={data.floatSpeed}
      rotationIntensity={data.floatRotation}
      floatIntensity={data.floatIntensity}
      position={data.position}
      rotation={data.rotation}
    >
      <mesh scale={data.scale}>
        {data.type === 'sphere' && <Sphere args={[1, 32, 32]}><meshPhysicalMaterial {...materialProps} /></Sphere>}
        {data.type === 'icosahedron' && <Icosahedron args={[1, 0]}><meshPhysicalMaterial {...materialProps} flatShading /></Icosahedron>}
        {data.type === 'torus' && <Torus args={[1, 0.3, 16, 32]}><meshPhysicalMaterial {...materialProps} /></Torus>}
      </mesh>
    </Float>
  );
};

const InteractiveScene = () => {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const shapes = useMemo(() => generateShapes(15), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Calculate target rotation based on mouse pointer
    // state.pointer holds normalized mouse coordinates [-1, 1]
    const targetX = (state.pointer.y * viewport.height) / 20;
    const targetY = (state.pointer.x * viewport.width) / 20;

    // Gently interpolate current rotation towards target
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape) => (
        <ShapeObject key={shape.id} data={shape} />
      ))}
    </group>
  );
};

export default function Interactive3DBackground() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        {/* Abstract environment map for sleek reflections */}
        <Environment preset="city" />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#0891b2" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
        
        <InteractiveScene />
      </Canvas>
    </div>
  );
}
