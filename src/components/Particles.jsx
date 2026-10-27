import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, CanvasTexture, NormalBlending } from 'three';

let sprite;
function getSprite() {
  if (sprite) return sprite;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  sprite = new CanvasTexture(c);
  return sprite;
}

// Soft rising particles. Opacity starts at 0 and is driven by the GSAP timeline.
export default function Particles({ id, registry, count = 40, y = 0, radius = 1.2, height = 1.2,
  speed = 0.25, size = 0.14, color = '#ffffff', additive = false }) {
  const ref = useRef();
  const { positions, seeds } = useMemo(() => {
    const seeds = [];
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * radius;
      seeds.push({ x: Math.cos(a) * r, z: Math.sin(a) * r, p: Math.random() });
    }
    return { positions: new Float32Array(count * 3), seeds };
  }, [count, radius]);

  useEffect(() => { registry.current.fx[id] = ref.current.material; }, [id, registry]);

  useFrame((state) => {
    const mat = ref.current.material;
    if (mat.opacity < 0.01) return; // skip work while invisible
    const t = state.clock.elapsedTime;
    const attr = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const s = seeds[i];
      const k = (t * speed + s.p) % 1;
      attr.setXYZ(i, s.x + Math.sin(t * 0.8 + s.p * 6) * 0.08, y + k * height, s.z);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial map={getSprite()} color={color} size={size} sizeAttenuation transparent
        opacity={0} depthWrite={false} blending={additive ? AdditiveBlending : NormalBlending} />
    </points>
  );
}
