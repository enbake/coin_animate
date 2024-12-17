// "";

import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Vector2 } from "three";

// Component to load and display the 3D coin model
const Coin = ({ mousePos }) => {
  const coinRef = useRef();
  const { scene } = useGLTF("/ethereum_coin.glb"); // Replace with your 3D model path

  // Animate the coin to follow mouse movement
  useFrame(() => {
    if (coinRef.current) {
      coinRef.current.rotation.y = mousePos.x * 0.4; // Rotate horizontally
      coinRef.current.rotation.x = mousePos.y * -0.8; // Rotate vertically
    }
  });

  return <primitive object={scene} ref={coinRef} scale={1} />;
};

// Main Scene Component
const CoinScene = () => {
  const [mousePos, setMousePos] = useState(new Vector2(0, 0));

  // Handle mouse movement
  const handleMouseMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1; // Normalize X
    const y = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize Y
    setMousePos(new Vector2(x, y));
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Coin mousePos={mousePos} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default CoinScene;
