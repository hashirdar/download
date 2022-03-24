export default function something(props){
    const meshRef = useRef();
    const exporter = new GLTFExporter();
   
    useEffect(() =>{
     exporter.parse( meshRef.current, function ( gltf ) {
       downloadJSON( gltf );
     }, options ); // you will have to provide the options here
    })
    return(
     <mesh ref={meshRef}>
     ...
     </mesh>
    )
   }
   