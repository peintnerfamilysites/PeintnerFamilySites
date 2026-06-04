import { Suspense, memo, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
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

function createSeededRandom(seed = 1) {
  let state = seed >>> 0;
  return () => {
    state += 0x6D2B79F5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const rand = createSeededRandom(42);

  const ocean = ctx.createLinearGradient(0, 0, 0, canvas.height);
  ocean.addColorStop(0, '#58d5ff');
  ocean.addColorStop(0.18, '#2d9cdb');
  ocean.addColorStop(0.5, '#1565c0');
  ocean.addColorStop(1, '#07172d');
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 36; i += 1) {
    const x = rand() * canvas.width;
    const y = rand() * canvas.height;
    const radius = 50 + rand() * 170;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, `rgba(255,255,255,${0.02 + rand() * 0.05})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const drawContinent = (points, fill, stroke = 'rgba(11, 58, 28, 0.35)') => {
    ctx.beginPath();
    ctx.moveTo(points[0][0], points[0][1]);

    for (let i = 1; i < points.length; i += 1) {
      const prev = points[i - 1];
      const curr = points[i];
      const midX = (prev[0] + curr[0]) / 2;
      const midY = (prev[1] + curr[1]) / 2;
      ctx.quadraticCurveTo(prev[0], prev[1], midX, midY);
    }

    const last = points[points.length - 1];
    const first = points[0];
    const closingMidX = (last[0] + first[0]) / 2;
    const closingMidY = (last[1] + first[1]) / 2;
    ctx.quadraticCurveTo(last[0], last[1], closingMidX, closingMidY);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  drawContinent(
    [
      [298, 190], [368, 132], [488, 130], [584, 176], [642, 258], [622, 348], [558, 408], [552, 512], [512, 624],
      [434, 732], [340, 674], [318, 572], [274, 468], [224, 362], [240, 268],
    ],
    '#4eb96c',
  );

  drawContinent(
    [
      [542, 520], [610, 538], [690, 590], [704, 688], [662, 802], [590, 900], [522, 850], [502, 740], [510, 640],
    ],
    '#6fc96f',
  );

  drawContinent(
    [
      [938, 196], [1070, 150], [1214, 164], [1354, 210], [1470, 306], [1460, 426], [1374, 510], [1230, 526], [1102, 494],
      [1008, 422], [936, 316],
    ],
    '#73bf54',
  );

  drawContinent(
    [
      [1196, 534], [1274, 560], [1366, 632], [1420, 744], [1384, 826], [1276, 860], [1202, 798], [1170, 700], [1148, 606],
    ],
    '#95ca58',
  );

  drawContinent(
    [
      [1660, 686], [1746, 654], [1832, 680], [1814, 762], [1724, 784], [1654, 748],
    ],
    '#82b74f',
  );

  ctx.fillStyle = 'rgba(245, 252, 255, 0.98)';
  ctx.beginPath();
  ctx.ellipse(338, 92, 220, 72, -0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(1718, 918, 246, 78, 0.14, 0, Math.PI * 2);
  ctx.fill();

  const terminator = ctx.createLinearGradient(canvas.width * 0.66, 0, canvas.width, 0);
  terminator.addColorStop(0, 'rgba(0,0,0,0)');
  terminator.addColorStop(1, 'rgba(0,0,0,0.34)');
  ctx.fillStyle = terminator;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  return texture;
}

function createCloudTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  const rand = createSeededRandom(1337);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 54; i += 1) {
    const x = rand() * canvas.width;
    const y = rand() * canvas.height;
    const width = 90 + rand() * 260;
    const height = 18 + rand() * 48;
    const rotation = rand() * Math.PI;
    const alpha = 0.13 + rand() * 0.14;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    const grad = ctx.createRadialGradient(0, 0, width * 0.18, 0, 0, width);
    grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
    grad.addColorStop(0.68, `rgba(255,255,255,${alpha * 0.56})`);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, width, height, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 4;
  return texture;
}

function EarthPlanet() {
  const tiltRef = useRef(null);
  const earthRef = useRef(null);
  const cloudRef = useRef(null);
  const atmosphereRef = useRef(null);
  const glowRef = useRef(null);

  const earthTexture = useMemo(() => createEarthTexture(), []);
  const cloudTexture = useMemo(() => createCloudTexture(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const smoothing = 1 - Math.exp(-delta * 2.6);

    if (tiltRef.current) {
      tiltRef.current.rotation.z = THREE.MathUtils.lerp(tiltRef.current.rotation.z, 0.41 + Math.sin(t * 0.18) * 0.035, smoothing);
      tiltRef.current.rotation.x = THREE.MathUtils.lerp(tiltRef.current.rotation.x, Math.cos(t * 0.14) * 0.025, smoothing);
    }

    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.22;
    }

    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.245;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= delta * 0.035;
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.015);
    }
  });

  return (
    <group position={[0, 0, 0]} renderOrder={1}>
      <pointLight position={[1.8, 0.6, 2.4]} intensity={18} distance={18} decay={2} color="#7dd3fc" />
      <pointLight position={[-2.2, -0.35, -1.4]} intensity={5.5} distance={10} decay={2} color="#3b82f6" />

      <mesh position={[0, 0, -0.18]} renderOrder={0}>
        <sphereGeometry args={[1.12, 32, 32]} />
        <meshBasicMaterial color="#020817" transparent opacity={0.28} />
      </mesh>

      <group ref={tiltRef}>
        <mesh ref={glowRef} renderOrder={0}>
          <sphereGeometry args={[1.03, 32, 32]} />
          <meshBasicMaterial
            color="#4cc9f0"
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>

        <mesh ref={earthRef} castShadow receiveShadow renderOrder={1}>
          <sphereGeometry args={[0.94, 64, 64]} />
          <meshStandardMaterial
            map={earthTexture}
            roughness={0.9}
            metalness={0.02}
            emissive="#08101f"
            emissiveIntensity={0.1}
          />
        </mesh>

        <mesh ref={cloudRef} renderOrder={2}>
          <sphereGeometry args={[0.958, 48, 48]} />
          <meshStandardMaterial
            map={cloudTexture}
            transparent
            opacity={0.3}
            roughness={1}
            depthWrite={false}
            color="#ffffff"
          />
        </mesh>

        <mesh ref={atmosphereRef} renderOrder={0}>
          <sphereGeometry args={[1.01, 40, 40]} />
          <meshBasicMaterial
            color="#93c5fd"
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function AnimatedRings() {
  const systemRef = useRef(null);
  const mainRig = useRef(null);
  const tiltedRig = useRef(null);
  const outerRig = useRef(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const smoothing = 1 - Math.exp(-delta * 4.5);

    if (systemRef.current) {
      systemRef.current.rotation.x = THREE.MathUtils.lerp(systemRef.current.rotation.x, Math.sin(t * 0.16) * 0.05, smoothing * 0.7);
      systemRef.current.rotation.y = THREE.MathUtils.lerp(systemRef.current.rotation.y, Math.cos(t * 0.12) * 0.06, smoothing * 0.7);
      systemRef.current.position.y = THREE.MathUtils.lerp(systemRef.current.position.y, 0.06 + Math.sin(t * 0.42) * 0.035, smoothing);
    }

    if (mainRig.current) {
      mainRig.current.rotation.x = THREE.MathUtils.lerp(mainRig.current.rotation.x, Math.sin(t * 0.18) * 0.17, smoothing);
      mainRig.current.rotation.y += delta * (0.12 + Math.sin(t * 0.09) * 0.02);
      mainRig.current.rotation.z = THREE.MathUtils.lerp(mainRig.current.rotation.z, Math.cos(t * 0.14) * 0.11, smoothing);
    }

    if (tiltedRig.current) {
      tiltedRig.current.rotation.x = THREE.MathUtils.lerp(tiltedRig.current.rotation.x, 1.18 + Math.sin(t * 0.13) * 0.2, smoothing);
      tiltedRig.current.rotation.y -= delta * (0.09 + Math.cos(t * 0.08) * 0.016);
      tiltedRig.current.rotation.z += delta * (0.055 + Math.sin(t * 0.11) * 0.013);
    }

    if (outerRig.current) {
      outerRig.current.rotation.x = THREE.MathUtils.lerp(outerRig.current.rotation.x, 0.78 + Math.cos(t * 0.11) * 0.14, smoothing);
      outerRig.current.rotation.y += delta * (0.06 + Math.sin(t * 0.07) * 0.013);
      outerRig.current.rotation.z -= delta * (0.07 + Math.cos(t * 0.1) * 0.011);
    }
  });

  const ringMaterial = useMemo(
    () => ({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      toneMapped: false,
    }),
    [],
  );

  return (
    <group ref={systemRef} position={[0, 0.06, -1.1]} scale={[1.94, 1.94, 1.94]}>
      <EarthPlanet />

      <group ref={mainRig} renderOrder={2}>
        <mesh>
          <torusGeometry args={[1.32, 0.013, 10, 128]} />
          <meshBasicMaterial color="#67e8f9" opacity={0.84} {...ringMaterial} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.72, 0.018, 12, 128]} />
          <meshBasicMaterial color="#22d3ee" opacity={0.98} {...ringMaterial} />
        </mesh>
        <mesh rotation={[0.18, -0.42, 0.22]}>
          <torusGeometry args={[2.14, 0.01, 10, 128]} />
          <meshBasicMaterial color="#a5f3fc" opacity={0.62} {...ringMaterial} />
        </mesh>
        <mesh rotation={[0.28, 0.62, 0.16]}>
          <torusGeometry args={[2.42, 0.012, 12, 128]} />
          <meshBasicMaterial color="#06b6d4" opacity={0.82} {...ringMaterial} />
        </mesh>
      </group>

      <group ref={tiltedRig} renderOrder={2}>
        <mesh rotation={[0.92, -0.14, 0.26]}>
          <torusGeometry args={[2.78, 0.009, 10, 128]} />
          <meshBasicMaterial color="#ddd6fe" opacity={0.42} {...ringMaterial} />
        </mesh>
        <mesh rotation={[1.14, 0.18, 0.48]}>
          <torusGeometry args={[3.08, 0.012, 12, 128]} />
          <meshBasicMaterial color="#f0abfc" opacity={0.72} {...ringMaterial} />
        </mesh>
        <mesh rotation={[1.38, 0.46, 0.14]}>
          <torusGeometry args={[3.42, 0.007, 10, 128]} />
          <meshBasicMaterial color="#e879f9" opacity={0.48} {...ringMaterial} />
        </mesh>
        <mesh rotation={[1.62, -0.38, -0.3]}>
          <torusGeometry args={[3.74, 0.009, 12, 128]} />
          <meshBasicMaterial color="#c084fc" opacity={0.62} {...ringMaterial} />
        </mesh>
      </group>

      <group ref={outerRig} renderOrder={2}>
        <mesh rotation={[0.72, 0.14, -0.46]}>
          <torusGeometry args={[4.1, 0.007, 10, 128]} />
          <meshBasicMaterial color="#5eead4" opacity={0.42} {...ringMaterial} />
        </mesh>
        <mesh rotation={[0.88, 0.32, -0.74]}>
          <torusGeometry args={[4.44, 0.009, 12, 128]} />
          <meshBasicMaterial color="#2dd4bf" opacity={0.62} {...ringMaterial} />
        </mesh>
        <mesh rotation={[1.04, -0.08, 0.58]}>
          <torusGeometry args={[4.82, 0.006, 10, 128]} />
          <meshBasicMaterial color="#99f6e4" opacity={0.34} {...ringMaterial} />
        </mesh>
        <mesh rotation={[1.18, -0.18, 0.86]}>
          <torusGeometry args={[5.18, 0.006, 8, 128]} />
          <meshBasicMaterial color="#e0f2fe" opacity={0.46} {...ringMaterial} />
        </mesh>
      </group>
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.72} />
      <hemisphereLight skyColor="#dff6ff" groundColor="#020617" intensity={0.8} />
      <directionalLight position={[3.2, 2.4, 5]} intensity={1.9} color="#ffffff" />
      <directionalLight position={[-4, -1, -3]} intensity={0.58} color="#60a5fa" />
      <AnimatedRings />
    </>
  );
}

function BackgroundEffects() {
  return (
    <div className="studio-world__css-rings" aria-hidden="true">
      <span className="studio-world__planet-glow" />
      <span className="studio-world__planet-core">
        <span className="studio-world__planet-atmosphere" />
      </span>
      <span className="studio-world__ring studio-world__ring--one" />
      <span className="studio-world__ring studio-world__ring--two" />
      <span className="studio-world__ring studio-world__ring--three" />
      <span className="studio-world__ring studio-world__ring--four" />
      <span className="studio-world__ring studio-world__ring--five" />
      <span className="studio-world__ring studio-world__ring--six" />
    </div>
  );
}

const StudioWorld = memo(function StudioWorld() {
  const [webglReady] = useState(() => canUseWebGL());
  const [webglFailed, setWebglFailed] = useState(false);

  if (!webglReady || webglFailed) {
    return (
      <div className="studio-world studio-world--fallback" aria-hidden="true">
        <BackgroundEffects />
      </div>
    );
  }

  return (
    <div className="studio-world" aria-hidden="true">
      <BackgroundEffects />

      <Canvas
        camera={{ position: [0, 0, 4.55], fov: 46 }}
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
