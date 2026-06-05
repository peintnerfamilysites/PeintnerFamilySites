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
    let nightLights;
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
      camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 4.1);
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

      const earthGeometry = new THREE.SphereGeometry(1, 96, 96);
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
            float dayAmount = smoothstep(-0.24, 0.34, facingLight);
            float nightAmount = 1.0 - dayAmount;

            vec3 dayColor = texture2D(dayMap, vUv).rgb;
            vec3 nightColor = texture2D(nightMap, vUv).rgb;

            // Keep the night texture visible, not just the city dots.
            vec3 dimNightSurface = nightColor * 1.55 + vec3(0.015, 0.026, 0.055) * nightAmount;
            vec3 litDaySurface = dayColor * (0.46 + 0.72 * dayAmount);

            vec3 color = mix(dimNightSurface, litDaySurface, dayAmount);

            // Add a soft blue terminator edge so the day/night transition reads clearly.
            float edgeGlow = smoothstep(0.22, 0.0, abs(facingLight)) * 0.12;
            color += vec3(0.08, 0.19, 0.34) * edgeGlow;

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });

      earth = new THREE.Mesh(earthGeometry, earthMaterial);
      earthGroup.add(earth);

      const cloudGeometry = new THREE.SphereGeometry(1.018, 64, 64);
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

      const atmosphereGeometry = new THREE.SphereGeometry(1.08, 48, 48);
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
        if (earthGroup) earthGroup.rotation.y += delta * 0.52;
        if (clouds) clouds.rotation.y += delta * 0.68;
        if (atmosphere) atmosphere.rotation.y += delta * 0.1;


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
