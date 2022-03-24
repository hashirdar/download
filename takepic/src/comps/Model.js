import React, { useRef, useState, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import { useSnapshot } from "valtio"
import state from "./State"
import {GLTFExporter} from "./GLTFExporter"
function Model() {
  const ref = useRef()
  const snap = useSnapshot(state)
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF("/model.glb")

  // Cursor showing current color
  const [hovered, set] = useState(null)

  const exporter = new GLTFExporter();
 
  var options = {
    trs: document.getElementById( 'option_trs' ).checked,
    onlyVisible: document.getElementById( 'option_visible' ).checked,
    truncateDrawRange: document.getElementById( 'option_drawrange' ).checked,
    binary: document.getElementById( 'option_binary' ).checked,
    forcePowerOfTwoTextures: document.getElementById( 'option_forcepot' ).checked,
    maxTextureSize: Number( document.getElementById( 'option_maxsize' ).value ) || Infinity // To prevent NaN value
  };
  var link = document.createElement( 'a' );
  link.style.display = 'none';
  document.body.appendChild( link ); // Firefox workaround, see #6594

	function save( blob, filename ) {

    link.href = URL.createObjectURL( blob );
    link.download = filename;
    link.click();

    // URL.revokeObjectURL( url ); breaks Firefox...

  }

  function saveArrayBuffer( buffer, filename ) {

    save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );

  }

  useEffect(() =>{
    function getmodel(){

   exporter.parse( ref.current, function ( gltf ) {
    if ( gltf instanceof ArrayBuffer ) {

      saveArrayBuffer( gltf, 'scene.glb' );

    } else {

      var output = JSON.stringify( gltf, null, 2 );
      console.log( output );
      saveString( output, 'scene.gltf' );

    }
   }, options ); // you will have to provide the options here


  }
   document.getElementById("export_object").addEventListener("click",getmodel);
  })


  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    if (hovered) {
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
      return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
    }
  }, [hovered])

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.05} position={[0, -2, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-44.59, 11.8, -32.58]} rotation={[Math.PI / 2, 0, -Math.PI]} scale={-83.11}>
            <mesh
              material-color={snap.items.Tire}
              geometry={nodes["Cristiano_-_BL_(Dominus)_Tread_0"].geometry}
              material={nodes["Cristiano_-_FR_(Dominus)_Tread_0"].material}
            />
            <mesh
              material-color={snap.items.Rim}
              geometry={nodes["Cristiano_-_BL_(Dominus)_Cristiano_0"].geometry}
              material={nodes["Cristiano_-_FR_(Dominus)_Cristiano_0"].material}
            />
          </group>
          <group position={[-44.59, 11.8, 32.58]} rotation={[-Math.PI / 2, 0, 0]} scale={82.06}>
            <mesh
              material-color={snap.items.Rim}
              geometry={nodes["Cristiano_-_BR_(Dominus)_Cristiano_0"].geometry}
              material={nodes["Cristiano_-_FR_(Dominus)_Cristiano_0"].material}
            />
            <mesh
              material-color={snap.items.Tire}
              geometry={nodes["Cristiano_-_BR_(Dominus)_Tread_0"].geometry}
              material={nodes["Cristiano_-_FR_(Dominus)_Tread_0"].material}
            />
          </group>
          <group position={[41.93, 11.26, -31.53]} rotation={[Math.PI / 2, 0, -Math.PI]} scale={-76.01}>
            <mesh
              material-color={snap.items.Rim}
              geometry={nodes["Cristiano_-_FL_(Dominus)_Cristiano_0"].geometry}
              material={nodes["Cristiano_-_FR_(Dominus)_Cristiano_0"].material}
            />
            <mesh
              material-color={snap.items.Tire}
              geometry={nodes["Cristiano_-_FL_(Dominus)_Tread_0"].geometry}
              material={nodes["Cristiano_-_FR_(Dominus)_Tread_0"].material}
            />
          </group>
          <group position={[41.93, 11.26, 31.85]} rotation={[-Math.PI / 2, 0, 0]} scale={76.01}>
            <mesh
              material-color={snap.items.Rim}
              geometry={nodes["Cristiano_-_FR_(Dominus)_Cristiano_0"].geometry}
              material={nodes["Cristiano_-_FR_(Dominus)_Cristiano_0"].material}
            />
            <mesh
              material-color={snap.items.Tire}
              geometry={nodes["Cristiano_-_FR_(Dominus)_Tread_0"].geometry}
              material={nodes["Cristiano_-_FR_(Dominus)_Tread_0"].material}
            />
          </group>
          <group position={[-8.96, 16.86, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh material-color={snap.items.Body} geometry={nodes.Dominus_Dominus_Body_0.geometry} material={materials.Body} />
            <mesh material-color={snap.items.Bottom} geometry={nodes.Dominus_Dominus_Chassis_0.geometry} material={materials.Bottom} />
            <mesh material-color={snap.items.Headlights} geometry={nodes.Dominus_Headlights_0.geometry} material={materials.Headlights} />
            <mesh material-color={snap.items.Paint} geometry={nodes.Dominus_Paint_0.geometry} material={materials.Paint} />
            <mesh material-color={snap.items.Window} geometry={nodes.Dominus_Window_0.geometry} material={materials.Window} />
          </group>
        </group>
      </group>
    </group>
  )
}

export default Model
