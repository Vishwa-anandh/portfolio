import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const positions = new Float32Array(3000);
    for (let i = 0; i < 3000; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x -= 0.001;
      ref.current.rotation.y -= 0.001;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#4F46E5" size={0.05} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

function Scene() {
  const mouse = useRef({ x: 0, y: 0 });
  
  useFrame((state) => {
    state.camera.position.x += (mouse.current.x * 2 - state.camera.position.x) * 0.05;
    state.camera.position.y += (-mouse.current.y * 2 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
      <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#c084fc" />
      
      {/* Central Abstract Geometry */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <TorusKnot args={[4, 0.3, 150, 32]} position={[0, 0, -15]}>
          <meshStandardMaterial 
            color="#0f172a" 
            roughness={0.2} 
            metalness={0.9} 
            wireframe={true} 
            transparent
            opacity={0.3}
          />
        </TorusKnot>
      </Float>

      {/* Floating inner sphere */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0, -15]}>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            roughness={0.1} 
            metalness={1} 
            wireframe={true} 
            transparent
            opacity={0.1}
          />
        </mesh>
      </Float>

      <ParticleField />
    </>
  );
}

export function Background3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <fog attach="fog" args={['#000000', 5, 30]} />
        <Scene />
      </Canvas>
    </div>
  );
}
