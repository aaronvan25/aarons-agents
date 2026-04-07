import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe2e2e0);

    // Camera
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 7);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Ring parameters
    const ringData = [
      { radius: 3.4, tubeRadius: 0.015, rotSpeed: 0.25, axis: 'x', tilt: 0.3 },
      { radius: 2.7, tubeRadius: 0.012, rotSpeed: 0.35, axis: 'y', tilt: -0.5 },
      { radius: 2.0, tubeRadius: 0.01, rotSpeed: 0.45, axis: 'z', tilt: 0.7 },
    ];

    const darkMat = new THREE.MeshBasicMaterial({ color: 0x111111, wireframe: true, transparent: true, opacity: 0.15 });
    const redMat = new THREE.MeshBasicMaterial({ color: 0xe62e31, wireframe: true, transparent: true, opacity: 0.6 });
    const redGlowMat = new THREE.MeshBasicMaterial({ color: 0xe62e31, wireframe: true, transparent: true, opacity: 0.05, blending: THREE.AdditiveBlending, depthWrite: false });

    const groups = [];

    ringData.forEach((rd, idx) => {
      const group = new THREE.Group();

      // Torus wireframe ring
      const torusGeo = new THREE.TorusGeometry(rd.radius, rd.tubeRadius, 16, 100);
      const torus = new THREE.Mesh(torusGeo, darkMat);
      group.add(torus);

      // Point dots along ring
      const pointCount = 60 + idx * 20;
      const pointsArr = [];
      for (let i = 0; i < pointCount; i++) {
        const angle = (i / pointCount) * Math.PI * 2;
        pointsArr.push(
          Math.cos(angle) * rd.radius,
          Math.sin(angle) * rd.radius,
          0
        );
      }
      const pointGeo = new THREE.BufferGeometry();
      pointGeo.setAttribute('position', new THREE.Float32BufferAttribute(pointsArr, 3));

      const isOuter = idx === 0;
      const pointMat = new THREE.PointsMaterial({
        color: isOuter ? 0xe62e31 : 0x111111,
        size: isOuter ? 0.025 : 0.015,
        sizeAttenuation: true,
        transparent: true,
        opacity: isOuter ? 0.5 : 0.3,
      });
      const points = new THREE.Points(pointGeo, pointMat);
      group.add(points);

      // Red glow echo on outer ring
      if (idx === 0) {
        const glowGeo = new THREE.TorusGeometry(rd.radius, 0.025, 16, 100);
        const glow = new THREE.Mesh(glowGeo, redGlowMat);
        glow.scale.setScalar(1.01);
        group.add(glow);
      }

      // Orbiting icosahedron node
      const icoGeo = new THREE.IcosahedronGeometry(0.06, 0);
      const ico = new THREE.Mesh(icoGeo, redMat);
      ico.userData = { radius: rd.radius, speed: 0.3 + idx * 0.15 };
      group.add(ico);

      // Apply tilt
      group.rotation.x = rd.tilt;
      group.rotation.z = rd.tilt * 0.5;

      scene.add(group);
      groups.push({ group, data: rd, ico });
    });

    // Constellation lines: red lines bridging outer and inner rings
    const redLineGeo = new THREE.BufferGeometry();
    const redLinePositions = [];
    for (let i = 0; i < 20; i++) {
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      redLinePositions.push(
        Math.cos(angle1) * 3.4, Math.sin(angle1) * 3.4, (Math.random() - 0.5) * 0.5,
        Math.cos(angle2) * 2.0, Math.sin(angle2) * 2.0, (Math.random() - 0.5) * 0.5
      );
    }
    redLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(redLinePositions, 3));
    const redLineMat = new THREE.LineBasicMaterial({ color: 0xe62e31, transparent: true, opacity: 0.1 });
    const redLines = new THREE.LineSegments(redLineGeo, redLineMat);
    scene.add(redLines);

    // Dark constellation lines bridging inner rings
    const darkLineGeo = new THREE.BufferGeometry();
    const darkLinePositions = [];
    for (let i = 0; i < 30; i++) {
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = Math.random() * Math.PI * 2;
      darkLinePositions.push(
        Math.cos(angle1) * 2.7, Math.sin(angle1) * 2.7, (Math.random() - 0.5) * 0.4,
        Math.cos(angle2) * 2.0, Math.sin(angle2) * 2.0, (Math.random() - 0.5) * 0.4
      );
    }
    darkLineGeo.setAttribute('position', new THREE.Float32BufferAttribute(darkLinePositions, 3));
    const darkLineMat = new THREE.LineBasicMaterial({ color: 0x111111, transparent: true, opacity: 0.05 });
    const darkLines = new THREE.LineSegments(darkLineGeo, darkLineMat);
    scene.add(darkLines);

    // Animation
    const clock = new THREE.Clock();
    let frame;

    function animate() {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      groups.forEach(({ group, data, ico }) => {
        group.rotation.y = t * data.rotSpeed;

        // Orbiting icosahedron
        const a = t * ico.userData.speed;
        ico.position.x = Math.cos(a) * ico.userData.radius;
        ico.position.y = Math.sin(a) * ico.userData.radius;
        ico.rotation.x = t * 2;
        ico.rotation.y = t * 1.5;
      });

      redLines.rotation.y = t * 0.1;
      darkLines.rotation.y = -t * 0.08;

      renderer.render(scene, camera);
    }

    animate();

    // Resize
    const onResize = () => {
      const w2 = mount.clientWidth;
      const h2 = mount.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      darkMat.dispose();
      redMat.dispose();
      redGlowMat.dispose();
      redLineMat.dispose();
      darkLineMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    />
  );
}
