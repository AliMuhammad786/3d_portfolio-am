import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

// eslint-disable-next-line react/prop-types
const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    <mesh>
      <hemisphereLight
        // eslint-disable-next-line react/no-unknown-property
        intensity={0.15}
        // eslint-disable-next-line react/no-unknown-property
        groundColor="black"
      />
      <spotLight
        // eslint-disable-next-line react/no-unknown-property
        position={[-20, 50, 10]}
        // eslint-disable-next-line react/no-unknown-property
        angle={0.12}
        // eslint-disable-next-line react/no-unknown-property
        penumbra={1}
        // eslint-disable-next-line react/no-unknown-property
        intensity={1}
        // eslint-disable-next-line react/no-unknown-property
        castShadow
        // eslint-disable-next-line react/no-unknown-property
        shadow-mapSize={1024}
      />
      <pointLight
        // eslint-disable-next-line react/no-unknown-property
        intensity={1}
      />
      <primitive
        // eslint-disable-next-line react/no-unknown-property
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.65}
        // eslint-disable-next-line react/no-unknown-property
        position={isMobile ? [0, -2.7, -0.4] : [0, -2.7, -1.5]}
        // eslint-disable-next-line react/no-unknown-property
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 500px)')

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
