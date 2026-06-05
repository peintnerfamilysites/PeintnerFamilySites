import { memo, useEffect, useRef, useState } from 'react';

const textureBase = `${import.meta.env.BASE_URL}textures/earth`;

function BackgroundEffects({ earthMountRef }) {
  return (
    <div className="studio-world__earth-stage" aria-hidden="true">
      <span className="studio-world__planet-glow" />
      <div className="studio-world__earth-shell">
        <div ref={earthMountRef} className="studio-world__earth-canvas" />
      </div>
    </div>
  );
}

const StudioWorld = memo(function StudioWorld() {
  const sceneRef = useRef(null);
  const earthMountRef = useRef(null);
  const worldRef = useRef(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const node = sceneRef.current;
    if (!node || typeof window === 'undefined') return undefined;

    let visibleInViewport = true;
    let visibleDocument = document.visibilityState === 'visible';

    const syncActiveState = () => {
      setIsActive(visibleInViewport && visibleDocument);
    };

    const handleVisibilityChange = () => {
      visibleDocument = document.visibilityState === 'visible';
      syncActiveState();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(
          ([entry]) => {
            visibleInViewport = entry.isIntersecting;
            syncActiveState();
          },
          { root: null, threshold: 0.02, rootMargin: '160px' },
        )
      : null;

    observer?.observe(node);
    syncActiveState();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    const mount = earthMountRef.current;
    if (!mount || typeof window === 'undefined') return undefined;

    let disposed = false;
    let resizeObserver = null;
    let rafId = 0;
    let renderer;
    let scene;
    let camera;
    let earthGroup;
    let earth;
    let ringGroups = [];
    let clouds;
    let atmosphere;
    let frameStarted = false;
    let startAnimation;
    let stopAnimation;

    const setup = async () => {
      let THREE;
      try {
        THREE = await import('three');
      } catch (error) {
        console.error('PFS Earth renderer failed to load Three.js. Run npm install after updating the project.', error);
        return;
      }

      const clock = new THREE.Clock();
      const textureLoader = new THREE.TextureLoader();

      const loadTexture = async (fileName, colorSpace = null) => {
        const texture = await textureLoader.loadAsync(`${textureBase}/${fileName}`);
        if (colorSpace) texture.colorSpace = colorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = true;
        return texture;
      };

      const [dayMap, nightMap, cloudMap, normalMap, specularMap] = await Promise.all([
        loadTexture('earth-day-2048.jpg', THREE.SRGBColorSpace),
        loadTexture('earth-night-2048.jpg', THREE.SRGBColorSpace),
        loadTexture('earth-clouds-2048.jpg'),
        loadTexture('earth-normal-2048.png'),
        loadTexture('earth-specular-2048.png'),
      ]);

      if (disposed) {
        [dayMap, nightMap, cloudMap, normalMap, specularMap].forEach((texture) => texture.dispose());
        return;
      }

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.display = 'block';
      mount.appendChild(renderer.domElement);

      const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 6);
      [dayMap, nightMap, cloudMap, normalMap, specularMap].forEach((texture) => {
        texture.anisotropy = maxAnisotropy;
      });

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
      camera.position.set(0, 0, 9.6);
      scene.add(camera);

      const rootGroup = new THREE.Group();
      rootGroup.rotation.x = THREE.MathUtils.degToRad(21.5);
      rootGroup.rotation.z = THREE.MathUtils.degToRad(-7);
      scene.add(rootGroup);

      const ambient = new THREE.AmbientLight(0x526ea5, 0.06);
      scene.add(ambient);

      const sun = new THREE.DirectionalLight(0xffffff, 2.45);
      sun.position.set(2.6, 0.25, 0.65);
      scene.add(sun);

      const rim = new THREE.DirectionalLight(0x69c7ff, 0.24);
      rim.position.set(-4.2, -0.6, 2.8);
      scene.add(rim);

      earthGroup = new THREE.Group();
      rootGroup.add(earthGroup);

      const earthGeometry = new THREE.SphereGeometry(1.62, 96, 96);
      const earthMaterial = new THREE.ShaderMaterial({
        uniforms: {
          dayMap: { value: dayMap },
          nightMap: { value: nightMap },
          lightDirection: { value: sun.position.clone().normalize() },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vWorldNormal;

          void main() {
            vUv = uv;
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D dayMap;
          uniform sampler2D nightMap;
          uniform vec3 lightDirection;
          varying vec2 vUv;
          varying vec3 vWorldNormal;

          void main() {
            float facingLight = dot(normalize(vWorldNormal), normalize(lightDirection));

            // Wider blend makes the planet visibly fade from day into night as it rotates.
            float dayAmount = smoothstep(0.48, 0.92, facingLight);
            float nightAmount = 1.0 - dayAmount;

            vec3 dayColor = texture2D(dayMap, vUv).rgb;
            vec3 nightColor = texture2D(nightMap, vUv).rgb;

            // Keep the night texture visible, not just the city dots.
            vec3 dimNightSurface = nightColor * 2.75 + vec3(0.008, 0.016, 0.042) * nightAmount;
            vec3 litDaySurface = dayColor * (0.52 + 0.42 * dayAmount);

            vec3 color = mix(dimNightSurface, litDaySurface, dayAmount);

            // Add a soft blue terminator edge so the day/night transition reads clearly.
            float edgeGlow = smoothstep(0.24, 0.03, abs(facingLight)) * 0.06;
            color += vec3(0.08, 0.19, 0.34) * edgeGlow;

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });

      earth = new THREE.Mesh(earthGeometry, earthMaterial);
      earthGroup.add(earth);

      const ringConfigs = [
        {
          radius: 2.35,
          tube: 0.0297,
          color: 0x2f5fbf,
          glowColor: 0x75aef6,
          opacity: 0.9,
          tilt: { x: 74, y: 12, z: 10 },
          speed: { x: 0.11, y: 0.195, z: 0.07 },
          textureRate: 0.014,
        },
        {
          radius: 2.81,
          tube: 0.0331,
          color: 0x3ea9c8,
          glowColor: 0x86def2,
          opacity: 0.76,
          tilt: { x: 24, y: 52, z: -34 },
          speed: { x: -0.07, y: 0.135, z: -0.095 },
          textureRate: -0.011,
        },
        {
          radius: 3.22,
          tube: 0.0281,
          color: 0x2ca38c,
          glowColor: 0x73dec6,
          opacity: 0.66,
          tilt: { x: 108, y: -18, z: 44 },
          speed: { x: 0.055, y: -0.09, z: 0.12 },
          textureRate: 0.009,
        },
        {
          radius: 3.61,
          tube: 0.0264,
          color: 0x5840b8,
          glowColor: 0xa08fff,
          opacity: 0.58,
          tilt: { x: 62, y: -46, z: 78 },
          speed: { x: -0.045, y: 0.08, z: -0.105 },
          textureRate: -0.007,
        },
      ];

      const ringSystem = new THREE.Group();
      earthGroup.add(ringSystem);

      ringConfigs.forEach((config) => {
        const ringGroup = new THREE.Group();
        ringGroup.rotation.set(
          THREE.MathUtils.degToRad(config.tilt.x),
          THREE.MathUtils.degToRad(config.tilt.y),
          THREE.MathUtils.degToRad(config.tilt.z),
        );

        const ringGeometry = new THREE.TorusGeometry(config.radius, config.tube, 24, 240);

        const ringMaterial = new THREE.ShaderMaterial({
          uniforms: {
            dayMap: { value: dayMap },
            nightMap: { value: nightMap },
            lightDirection: { value: sun.position.clone().normalize() },
            baseColor: { value: new THREE.Color(config.color) },
            glowColor: { value: new THREE.Color(config.glowColor) },
            ringOpacity: { value: config.opacity },
            textureOffset: { value: 0 },
          },
          vertexShader: `
            varying vec2 vUv;
            varying vec3 vWorldNormal;
            varying vec3 vViewNormal;

            void main() {
              vUv = uv;
              vWorldNormal = normalize(mat3(modelMatrix) * normal);
              vViewNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D dayMap;
            uniform sampler2D nightMap;
            uniform vec3 lightDirection;
            uniform vec3 baseColor;
            uniform vec3 glowColor;
            uniform float ringOpacity;
            uniform float textureOffset;
            varying vec2 vUv;
            varying vec3 vWorldNormal;
            varying vec3 vViewNormal;

            void main() {
              float facingLight = dot(normalize(vWorldNormal), normalize(lightDirection));
              float dayAmount = smoothstep(0.12, 0.74, facingLight);
              float nightAmount = 1.0 - dayAmount;

              vec2 texUv = vec2(fract(vUv.x * 2.8 + textureOffset), fract(vUv.y * 1.15));
              vec3 dayTex = texture2D(dayMap, texUv).rgb;
              vec3 nightTex = texture2D(nightMap, texUv).rgb;

              vec3 ringDay = dayTex * 0.72 + baseColor * 0.62;
              vec3 ringNight = nightTex * 1.65 + baseColor * 0.28 + vec3(0.01, 0.018, 0.04) * nightAmount;
              vec3 color = mix(ringNight, ringDay, dayAmount);
              color = mix(baseColor * 0.58, color, 0.78);

              float fresnel = pow(1.0 - abs(normalize(vViewNormal).z), 2.0);
              color += glowColor * (0.16 + fresnel * 0.22);

              gl_FragColor = vec4(color, ringOpacity);
            }
          `,
          transparent: true,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        const glowMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(config.glowColor),
          transparent: true,
          opacity: config.opacity * 0.2,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        });

        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        const glow = new THREE.Mesh(new THREE.TorusGeometry(config.radius, config.tube * 2.3, 20, 240), glowMaterial);
        ringGroup.add(glow);
        ringGroup.add(ring);
        ringGroup.userData.spin = config.speed;
        ringGroup.userData.textureRate = config.textureRate;
        ringGroup.userData.ringMaterial = ringMaterial;
        ringSystem.add(ringGroup);
        ringGroups.push(ringGroup);
      });

      const cloudGeometry = new THREE.SphereGeometry(1.65, 64, 64);
      const cloudMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color(0xf5fbff),
        alphaMap: cloudMap,
        transparent: true,
        opacity: 0.94,
        depthWrite: false,
        shininess: 2,
        side: THREE.DoubleSide,
      });

      clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
      clouds.rotation.z = THREE.MathUtils.degToRad(0.8);
      rootGroup.add(clouds);

      const atmosphereGeometry = new THREE.SphereGeometry(1.78, 48, 48);
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x59c7ff),
        transparent: true,
        opacity: 0.11,
        side: THREE.BackSide,
        depthWrite: false,
      });

      atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      rootGroup.add(atmosphere);

      const syncSize = () => {
        if (!renderer || !camera) return;
        const width = Math.max(1, mount.clientWidth);
        const height = Math.max(1, mount.clientHeight);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };

      const renderFrame = () => {
        if (!frameStarted || disposed) return;
        const delta = Math.min(clock.getDelta(), 0.033);

        // Move both the meshes and the textures so the continent motion is obvious,
        // even behind the hero glass card.
        if (earthGroup) earthGroup.rotation.y += delta * 0.17;
        if (clouds) clouds.rotation.y += delta * 0.22;
        if (atmosphere) atmosphere.rotation.y += delta * 0.03;
        ringGroups.forEach((ringGroup) => {
          const spin = ringGroup.userData.spin;
          ringGroup.rotation.x += delta * spin.x;
          ringGroup.rotation.y += delta * spin.y;
          ringGroup.rotation.z += delta * spin.z;

          const ringMaterial = ringGroup.userData.ringMaterial;
          if (ringMaterial?.uniforms?.textureOffset) {
            ringMaterial.uniforms.textureOffset.value = (ringMaterial.uniforms.textureOffset.value + delta * ringGroup.userData.textureRate) % 1;
          }
        });

        renderer.render(scene, camera);
        rafId = window.requestAnimationFrame(renderFrame);
      };

      startAnimation = () => {
        if (disposed || frameStarted) return;
        frameStarted = true;
        clock.getDelta();
        rafId = window.requestAnimationFrame(renderFrame);
      };

      stopAnimation = () => {
        frameStarted = false;
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      };

      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(mount);
      syncSize();

      worldRef.current = {
        startAnimation,
        stopAnimation,
      };

      if (isActive) {
        startAnimation();
      }
    };

    setup();

    return () => {
      disposed = true;
      worldRef.current = null;
      if (resizeObserver) resizeObserver.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && renderer.domElement.parentNode === mount) {
          mount.removeChild(renderer.domElement);
        }
      }
      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => {
              ['map', 'normalMap', 'specularMap', 'emissiveMap', 'alphaMap'].forEach((key) => {
                if (material[key]) material[key].dispose();
              });
              if (material.uniforms) {
                Object.values(material.uniforms).forEach((uniform) => {
                  if (uniform?.value?.isTexture) uniform.value.dispose();
                });
              }
              material.dispose();
            });
          }
        });
      }
    };
  }, []);

  useEffect(() => {
    const world = worldRef.current;
    if (!world) return;
    if (isActive) world.startAnimation?.();
    else world.stopAnimation?.();
  }, [isActive]);

  return (
    <div
      ref={sceneRef}
      className={`studio-world studio-world--fallback${isActive ? '' : ' studio-world--paused'}`}
      aria-hidden="true"
    >
      <BackgroundEffects earthMountRef={earthMountRef} />
    </div>
  );
});

export default StudioWorld;
