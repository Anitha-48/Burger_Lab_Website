import { memo, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { LatheGeometry, MathUtils, Object3D, RingGeometry, Vector2 } from 'three';
import { layers } from '../data/burgerLayers.js';
import Particles from './Particles.jsx';

const lathe = (pts) => new LatheGeometry(pts.map(([x, y]) => new Vector2(x, y)), 72);

const makeBottomBun = () =>
  lathe([[0, 0], [1.3, 0], [1.46, 0.05], [1.52, 0.17], [1.5, 0.27], [1.35, 0.3], [0, 0.3]]);

function makeTopBun() {
  const p = [[0, 0], [1.3, 0], [1.5, 0.05]];
  for (let i = 0; i <= 28; i++) {
    const a = (i / 28) * (Math.PI / 2);
    p.push([1.58 * Math.cos(a), 0.1 + 0.72 * Math.sin(a)]);
  }
  return lathe(p);
}

function makePatty() {
  const g = lathe([[0, 0], [1, 0], [1.38, 0], [1.47, 0.06], [1.5, 0.18], [1.47, 0.3],
    [1.38, 0.36], [1.0, 0.36], [0.6, 0.36], [0.2, 0.36], [0, 0.36]]);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    if (pos.getY(i) > 0.3) {
      const x = pos.getX(i), z = pos.getZ(i);
      pos.setY(i, pos.getY(i) + Math.sin(x * 8.3) * Math.cos(z * 7.1) * 0.02 + Math.sin(x * 21 + z * 17) * 0.008);
    }
  }
  g.computeVertexNormals();
  return g;
}

function makeLettuce() {
  const g = new RingGeometry(0.05, 1.75, 72, 14);
  g.rotateX(-Math.PI / 2);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), z = p.getZ(i);
    const r = Math.hypot(x, z), a = Math.atan2(z, x), k = r / 1.75;
    const rr = r * (1 + 0.07 * Math.sin(a * 7) * k);
    p.setX(i, Math.cos(a) * rr);
    p.setZ(i, Math.sin(a) * rr);
    p.setY(i, Math.sin(a * 11) * 0.06 * k * k + Math.sin(r * 7 + a * 3) * 0.025 * k);
  }
  g.computeVertexNormals();
  return g;
}

function Sesame() {
  const ref = useRef();
  useLayoutEffect(() => {
    const d = new Object3D();
    let s = 7;
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 48; i++) {
      const a = 0.25 + rnd() * 1.2, th = rnd() * Math.PI * 2;
      const r = 1.58 * Math.cos(a);
      d.position.set(Math.cos(th) * r, 0.1 + 0.72 * Math.sin(a) + 0.02, Math.sin(th) * r);
      d.rotation.set(rnd() * 3, -th, -(Math.PI / 2 - a), 'YZX');
      d.scale.set(1, 0.45, 0.55);
      d.updateMatrix();
      ref.current.setMatrixAt(i, d.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[null, null, 48]}>
      <sphereGeometry args={[0.08, 10, 8]} />
      <meshStandardMaterial color="#f6e7c1" roughness={0.5} />
    </instancedMesh>
  );
}

// Every layer is a <group> registered in the shared registry so GSAP can move it.
function Layer({ cfg, registry, children }) {
  const ref = useRef();
  useLayoutEffect(() => {
    registry.current.layers[cfg.id] = ref.current;
    return () => {
      delete registry.current.layers[cfg.id];
    };
  }, [cfg.id, registry]);
  return (
    <group
      ref={ref}
      position={[cfg.fromX || 0, cfg.from, cfg.fromZ || 0]}
      rotation={[cfg.tilt || 0, cfg.spin || 0, 0]}
      scale={0.96}
    >
      {children}
    </group>
  );
}

const pickleSpots = [[0.55, 0], [-0.55, 0.1], [0, 0.6], [0.1, -0.6], [0.95, 0.5], [-0.9, -0.5]];

function BurgerModel({ registry, onReady }) {
  const geo = useMemo(() => ({
    bottom: makeBottomBun(), top: makeTopBun(), patty: makePatty(), lettuce: makeLettuce(),
  }), []);
  const rootRef = useRef();
  const cfg = useMemo(() => Object.fromEntries(layers.map((l) => [l.id, l])), []);

  useLayoutEffect(() => { registry.current.root = rootRef.current; }, [registry]);
  useEffect(() => { onReady?.(); }, [onReady]);

  // Gentle spin + mouse parallax. `reveal.v` (0..1) is tweened by the timeline.
  useFrame((state) => {
    const r = registry.current;
    const root = rootRef.current;
    const t = state.clock.elapsedTime;
    const spin = r.reduce ? 0 : r.reveal.v * Math.sin(t * 0.25) * 0.035;
    const ty = spin + state.pointer.x * 0.06;
    const tx = -state.pointer.y * 0.025;
    root.rotation.y = MathUtils.lerp(root.rotation.y, ty, 0.06);
    root.rotation.x = MathUtils.lerp(root.rotation.x, tx, 0.06);
  });

  return (
    <group ref={rootRef}>
      <ContactShadows position={[0, -0.02, 0]} opacity={0.65} scale={9} blur={2.6} far={2.2} resolution={256} />

      <Layer cfg={cfg.bottomBun} registry={registry}>
        <mesh geometry={geo.bottom}><meshStandardMaterial color="#d9a050" roughness={0.6} side={2} /></mesh>
      </Layer>

      <Layer cfg={cfg.patty} registry={registry}>
        <mesh geometry={geo.patty}><meshStandardMaterial color="#4a2a1b" roughness={0.85} side={2} /></mesh>
      </Layer>

      <Layer cfg={cfg.cheese} registry={registry}>
        <mesh position-y={0.025} rotation-y={Math.PI / 4}>
          <boxGeometry args={[2.6, 0.05, 2.6]} />
          <meshPhysicalMaterial color="#ffb81c" roughness={0.3} clearcoat={0.6} />
        </mesh>
      </Layer>

      <Layer cfg={cfg.lettuce} registry={registry}>
        <mesh geometry={geo.lettuce}><meshStandardMaterial color="#6fbf3a" roughness={0.55} side={2} /></mesh>
        <mesh position={[-0.48, 0.035, 0.22]} rotation={[0.12, -0.5, 0.2]} scale={[0.23, 0.035, 0.09]}>
          <sphereGeometry args={[1, 16, 10]} />
          <meshStandardMaterial color="#74b83e" roughness={0.55} side={2} />
        </mesh>
        <mesh position={[0.34, 0.045, -0.38]} rotation={[-0.1, 0.7, -0.24]} scale={[0.2, 0.03, 0.08]}>
          <sphereGeometry args={[1, 16, 10]} />
          <meshStandardMaterial color="#85c94b" roughness={0.55} side={2} />
        </mesh>
      </Layer>

      <Layer cfg={cfg.tomato} registry={registry}>
        <mesh position-y={0.06}>
          <cylinderGeometry args={[1.3, 1.3, 0.12, 48]} />
          <meshStandardMaterial color="#c9281a" roughness={0.35} />
        </mesh>
        <mesh position-y={0.062}>
          <cylinderGeometry args={[1.12, 1.12, 0.12, 48]} />
          <meshStandardMaterial color="#ee4f3a" roughness={0.3} />
        </mesh>
        {[1.2, 0.85, 0.5].map((r) => (
          <mesh key={r} position-y={0.06} rotation-x={Math.PI / 2}>
            <torusGeometry args={[r, 0.06, 10, 56]} />
            <meshStandardMaterial color="#b45a9c" roughness={0.4} />
          </mesh>
        ))}
        {pickleSpots.map(([x, z], i) => (
          <mesh key={i} position={[x, 0.03, z]}>
            <cylinderGeometry args={[0.32, 0.32, 0.05, 28]} />
            <meshStandardMaterial color="#6b8f23" roughness={0.4} />
          </mesh>
        ))}
        <mesh position-y={0.03}>
          <cylinderGeometry args={[1.12, 1.12, 0.07, 48]} />
          <meshStandardMaterial color="#c2412d" roughness={0.25} />
        </mesh>
      </Layer>

      <Layer cfg={cfg.topBun} registry={registry}>
        <mesh geometry={geo.top}><meshStandardMaterial color="#d98f3a" roughness={0.5} side={2} /></mesh>
        <Sesame />
      </Layer>

      <Particles id="steam" registry={registry} count={24} y={0.7} radius={1.1} height={1.3}
        speed={0.12} size={0.5} color="#ffe6cc" />
      <Particles id="sparks" registry={registry} count={14} y={1.5} radius={1.5} height={0.9}
        speed={0.5} size={0.12} color="#ffb347" additive />
    </group>
  );
}
export default memo(BurgerModel);
