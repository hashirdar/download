import React, { Suspense } from "react"
import { Canvas, useThree } from "@react-three/fiber"
console.log(Canvas)
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei"

import Model from "./comps/Model"
import ColorPicker from "./comps/ColorPicker"

export default function App() {
  return (
    <>
      <Canvas  gl={{ preserveDrawingBuffer: true }} shadows dpr={[1, 2]} camera={{ position: [20, 20, 40], fov: 10 }} >
        <ambientLight intensity={0.7} />
        <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="city" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} enablePan={false} />
     

      </Canvas>
      <ColorPicker />
    </>
  )

}
