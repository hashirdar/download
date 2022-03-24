import * as THREE from "three"
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"

function exportGLTF(input) {
  const gltfExporter = new GLTFExporter()

  const options = {
    binary: true,
  }
  gltfExporter.parse(
    input,
    function (result) {
      if (result instanceof ArrayBuffer) {
        saveArrayBuffer(result, "scene.glb")
      } else {
        const output = JSON.stringify(result, null, 2)
        console.log(output)
        saveString(output, "scene.gltf")
      }
    },
    function (error) {
      console.log("An error happened during parsing", error)
    },
    options,
  )
}

const link = document.createElement("a")
link.style.display = "block"
link.style.position = "absolute"
link.style.left = "200px"
link.style.width = "200px"
link.style.height = "100px"
document.body.appendChild(link)

function save(blob, fileName) {
  link.href = URL.createObjectURL(blob)
  link.download = fileName
  link.click()
}

function saveArrayBuffer(buffer, fileName) {
  save(new Blob([buffer], { type: "application/octet-stream" }), fileName)
}

function saveString(text, filename) {
  save(new Blob([text], { type: "text/plain" }), filename)
}
