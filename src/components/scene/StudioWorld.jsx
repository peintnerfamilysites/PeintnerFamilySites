import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Stars, Text } from '@react-three/drei';

function Orb({ position, scale, speed, color }) {
  const ref = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    ref.current.rotation.x = t * 0.18 * speed;
    ref.current.rotation.y = t * 0.32 * speed;
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.16;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 2]} />
      <MeshTransmissionMaterial
        backside
        color={color}
        transmission={0.75}
        thickness={0.35}
        roughness={0.14}
        chromaticAberration={0.035}
        anisotropicBlur={0.12}
      />
    </mesh>
  );
}

function Nodes() {
  const nodes = useMemo(() => {
    return Array.from({ length: 88 }, (_, i) => {
      const row = Math.floor(i / 11);
      const col = i % 11;
      return {
        position: [(col - 5) * 0.78, (row - 4) * 0.42, -2.4 - ((i * 17) % 12) * 0.14],
        size: 0.012 + (i % 3) * 0.006,
      };
    });
  }, []);

  return nodes.map((node, index) => (
    <mesh key={index} position={node.position}>
      <sphereGeometry args={[node.size, 10, 10]} />
      <meshStandardMaterial color="#d9f7ff" emissive="#23c8ff" emissiveIntensity={1.8} />
    </mesh>
  ));
}

function SceneContent() {
  const ring = useRef(null);
  const secondRing = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring.current) {
      ring.current.rotation.x = Math.sin(t * 0.36) * 0.18;
      ring.current.rotation.y = t * 0.18;
    }
    if (secondRing.current) {
      secondRing.current.rotation.x = Math.cos(t * 0.25) * 0.25;
      secondRing.current.rotation.z = -t * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-4, -1, 3]} intensity={16} color="#21d4ff" />
      <pointLight position={[4, 2, 2]} intensity={12} color="#8b5cf6" />
      <Stars radius={44} depth={22} count={1000} factor={2.8} fade speed={0.35} />
      <Nodes />

      <Float speed={1.25} rotationIntensity={0.22} floatIntensity={0.42}>
        <Text fontSize={0.78} letterSpacing={0.06} anchorX="center" anchorY="middle" position={[0, 0.35, 0]}>
          PFS
          <meshStandardMaterial color="#f7fdff" metalness={0.85} roughness={0.16} emissive="#0ea5e9" emissiveIntensity={0.55} />
        </Text>
        <Text fontSize={0.105} letterSpacing={0.1} anchorX="center" position={[0, -0.16, 0.04]}>
          DESIGN • BUILD • LAUNCH
          <meshStandardMaterial color="#9deaff" emissive="#38bdf8" emissiveIntensity={1.5} />
        </Text>
      </Float>

      <mesh ref={ring} position={[0, 0.07, -0.2]}>
        <torusGeometry args={[1.55, 0.012, 18, 150]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#0ea5e9" emissiveIntensity={2.1} metalness={1} roughness={0.18} />
      </mesh>
      <mesh ref={secondRing} position={[0, 0.07, -0.3]} rotation={[1.35, 0.12, 0.5]}>
        <torusGeometry args={[1.95, 0.008, 18, 150]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#7c3aed" emissiveIntensity={1.4} metalness={1} roughness={0.22} />
      </mesh>

      <Orb position={[-2.15, -0.82, -0.15]} scale={0.34} speed={0.78} color="#0ea5e9" />
      <Orb position={[2.18, 0.86, -0.62]} scale={0.28} speed={1.08} color="#8b5cf6" />
    </>
  );
}

function StudioWorld() {
  return (
    <div className="studio-world" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.25], fov: 48 }} dpr={[1, 1.55]} performance={{ min: 0.55 }}>
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default StudioWorld;
