import { memo, useEffect, useLayoutEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import BurgerModel from './BurgerModel.jsx';

// Keeps the burger framed on any screen shape.
function Rig({ registry }) {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    const portrait = size.width / size.height < 0.9;
    camera.position.set(0, 0.15, portrait ? 9.5 : size.width < 1000 ? 9.2 : 8.8);
    camera.lookAt(0, 0, 0);
    const root = registry.current.root;
    if (root) root.position.y = portrait ? 0.08 : -0.15;
  }, [camera, size, registry]);
  return null;
}
function Lights({ registry }) {
  const accent = useRef();
  useEffect(() => { registry.current.lights.accent = accent.current; }, [registry]);
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 7, 4]} intensity={2.2} />
      <pointLight ref={accent} position={[-3.5, 2.5, 3.5]} intensity={45} color="#ff8a24" />
      <pointLight position={[3, -1, -3]} intensity={18} color="#ffd9a8" />
      {/* Procedural studio lighting: no HDR file download needed */}
      <Environment resolution={256} environmentIntensity={0.7}>
        <Lightformer form="rect" intensity={3} position={[0, 5, 2]} scale={[8, 4, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[5, 1, 0]} rotation-y={-Math.PI / 2} scale={[6, 3, 1]} />
      </Environment>
    </>
  );
}

function BurgerScene({ registry, onReady }) {
  return (
    <Canvas
      className="scene"
      dpr={[1, 1.5]}
      camera={{ fov: 35, position: [0, 0.15, 8.8], near: 0.1, far: 50 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <Lights registry={registry} />
      <BurgerModel registry={registry} onReady={onReady} />
      <Rig registry={registry} />
    </Canvas>
  );
}
export default memo(BurgerScene);
