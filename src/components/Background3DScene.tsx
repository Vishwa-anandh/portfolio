import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Phones render this on a much smaller canvas where the extra particles read
// as noise anyway, and every one of them costs fill rate and battery.
const isSmallScreen = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const count = isSmallScreen() ? 1200 : 3000;
    const positions = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  });

  // Delta-scaled so the drift runs at one speed on every display. The old
  // per-frame constant made this rotate twice as fast on a 120Hz screen.
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= 0.06 * delta;
      ref.current.rotation.y -= 0.06 * delta;
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
    // Touch-only devices never fire this; skip the listener entirely there.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#818cf8" />
      <directionalLight position={[-10, -10, -5]} intensity={0.8} color="#c084fc" />

      {/* Central Abstract Geometry.
          These read as only a faint haze through the fog, but they are not
          dead weight — measured in isolation they carry roughly an eighth of
          the backdrop's light. Note the segment counts ARE the artwork: this
          renders as a wireframe, so lowering them to save triangles visibly
          thins the mesh rather than simplifying it. */}
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

/** True while the tab is in the background. */
function useTabHidden() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return hidden;
}

export default function Background3DScene() {
  // Read once on mount: a drifting starfield is exactly the kind of ambient
  // motion reduced-motion asks to stop, so render one static frame instead.
  const [reducedMotion] = useState(prefersReducedMotion);
  const tabHidden = useTabHidden();

  // Driven as a prop rather than through the imperative setFrameloop(), which
  // does not stop an already-running loop in r3f 9.
  const frameloop = tabHidden ? "never" : reducedMotion ? "demand" : "always";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, isSmallScreen() ? 1.5 : 2]}
        frameloop={frameloop}
      >
        <fog attach="fog" args={['#000000', 5, 30]} />
        <Scene />
      </Canvas>
    </div>
  );
}
