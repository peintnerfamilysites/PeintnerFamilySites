import { Suspense, memo, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function canUseWebGL() {
  if (typeof window === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const options = {
      alpha: true,
      antialias: false,
      depth: true,
      stencil: false,
      failIfMajorPerformanceCaveat: false,
      powerPreference: 'default',
    };

    const gl = canvas.getContext('webgl2', options) || canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options);
    return Boolean(gl);
  } catch {
    return false;
  }
}

function Orb({ position, scale, speed, color }) {
  const ref = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const orb = ref.current;
    if (!orb) return;

    orb.rotation.x = t * 0.14 * speed;
    orb.rotation.y = t * 0.24 * speed;
    orb.position.y = position[1] + Math.sin(t * speed) * 0.12;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} transparent opacity={0.58} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function Nodes() {
  const ref = useRef(null);

  const nodes = useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => {
      const row = Math.floor(i / 8);
      const col = i % 8;
      return {
        position: [(col - 3.5) * 0.9, (row - 3.2) * 0.48, -2.5 - ((i * 17) % 10) * 0.14],
        size: 0.018 + (i % 3) * 0.006,
      };
    });
  }, []);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const matrix = new THREE.Matrix4();
    nodes.forEach((node, index) => {
      matrix.compose(
        new THREE.Vector3(...node.position),
        new THREE.Quaternion(),
        new THREE.Vector3(node.size, node.size, node.size),
      );
      ref.current.setMatrixAt(index, matrix);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  }, [nodes]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, nodes.length]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#d9f7ff" transparent opacity={0.58} depthWrite={false} toneMapped={false} />
    </instancedMesh>
  );
}

function AnimatedRings() {
  const mainRig = useRef(null);
  const tiltedRig = useRef(null);
  const outerRig = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (mainRig.current) {
      mainRig.current.rotation.x = Math.sin(t * 0.3) * 0.18;
      mainRig.current.rotation.y = t * 0.2;
      mainRig.current.rotation.z = Math.cos(t * 0.2) * 0.08;
    }

    if (tiltedRig.current) {
      tiltedRig.current.rotation.x = 1.22 + Math.sin(t * 0.22) * 0.2;
      tiltedRig.current.rotation.y = -t * 0.16;
      tiltedRig.current.rotation.z = t * 0.11;
    }

    if (outerRig.current) {
      outerRig.current.rotation.x = 0.74 + Math.cos(t * 0.18) * 0.16;
      outerRig.current.rotation.y = t * 0.11;
      outerRig.current.rotation.z = -t * 0.14;
    }
  });

  const ringMaterial = useMemo(
    () => ({
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    }),
    [],
  );

  return (
    <group position={[0, 0.02, -0.72]} scale={[1.26, 1.26, 1.26]}>
      <group ref={mainRig}>
        <mesh>
          <torusGeometry args={[1.86, 0.018, 12, 128]} />
          <meshBasicMaterial color="#7dd3fc" opacity={0.92} {...ringMaterial} />
        </mesh>
        <mesh rotation={[0.28, 0.62, 0.16]}>
          <torusGeometry args={[2.12, 0.012, 12, 128]} />
          <meshBasicMaterial color="#38bdf8" opacity={0.68} {...ringMaterial} />
        </mesh>
      </group>

      <group ref={tiltedRig}>
        <mesh rotation={[1.14, 0.18, 0.48]}>
          <torusGeometry args={[2.5, 0.012, 12, 128]} />
          <meshBasicMaterial color="#a5f3fc" opacity={0.58} {...ringMaterial} />
        </mesh>
        <mesh rotation={[1.62, -0.38, -0.3]}>
          <torusGeometry args={[2.78, 0.009, 12, 128]} />
          <meshBasicMaterial color="#60a5fa" opacity={0.46} {...ringMaterial} />
        </mesh>
      </group>

      <group ref={outerRig}>
        <mesh rotation={[0.88, 0.32, -0.74]}>
          <torusGeometry args={[3.12, 0.009, 12, 128]} />
          <meshBasicMaterial color="#67e8f9" opacity={0.42} {...ringMaterial} />
        </mesh>
        <mesh rotation={[1.18, -0.18, 0.86]}>
          <torusGeometry args={[3.46, 0.006, 8, 128]} />
          <meshBasicMaterial color="#dbeafe" opacity={0.28} {...ringMaterial} />
        </mesh>
      </group>
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <Stars radius={38} depth={16} count={360} factor={2.15} fade speed={0.16} />
      <Nodes />
      <AnimatedRings />
      <Orb position={[-2.15, -0.82, -0.15]} scale={0.28} speed={0.72} color="#0ea5e9" />
      <Orb position={[2.18, 0.86, -0.62]} scale={0.23} speed={0.95} color="#2563eb" />
    </>
  );
}

const StudioWorld = memo(function StudioWorld() {
  const [webglReady] = useState(() => canUseWebGL());
  const [webglFailed, setWebglFailed] = useState(false);

  const cssRings = (
    <div className="studio-world__css-rings" aria-hidden="true">
      <span className="studio-world__ring studio-world__ring--one" />
      <span className="studio-world__ring studio-world__ring--two" />
      <span className="studio-world__ring studio-world__ring--three" />
    </div>
  );

  if (!webglReady || webglFailed) {
    return (
      <div className="studio-world studio-world--fallback" aria-hidden="true">
        {cssRings}
      </div>
    );
  }

  return (
    <div className="studio-world" aria-hidden="true">
      {cssRings}
      <Canvas
        camera={{ position: [0, 0, 4.25], fov: 48 }}
        dpr={[1, 1.15]}
        performance={{ min: 0.6 }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);

          const canvas = gl.domElement;
          const handleContextLost = (event) => {
            event.preventDefault();
            setWebglFailed(true);
          };

          canvas.addEventListener('webglcontextlost', handleContextLost, false);
        }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'default',
          stencil: false,
          depth: true,
          precision: 'mediump',
          failIfMajorPerformanceCaveat: false,
        }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default StudioWorld;
