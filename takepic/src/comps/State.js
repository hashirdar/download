import { proxy } from "valtio"

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {
    Tire: "#ffffff",
    Rim: "#ffffff",
    Headlight: "#ffffff",
    Paint: "#ffffff",
    Body: "#ffffff",
    Bottom: "#ffffff",
    Windows: "#ffffff",
  },
})

export default state
