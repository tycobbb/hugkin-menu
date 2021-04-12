import { screen } from "./screen.js"

// -- props --
let $mEl = null
let $mCtx = null

// -- lifetime --
export function init() {
  // capture elements
  $mEl = document.getElementById("marks")
  $mCtx = $mEl.getContext("2d")

  // size canvas
  const r = $mEl.getBoundingClientRect()
  $mEl.width = r.width
  $mEl.height = r.height

  // init events
  initEvents()

  return {}
}

// -- events --
function initEvents() {
  screen().addEventListener("click", didClick)
}

function didClick(evt) {
}
