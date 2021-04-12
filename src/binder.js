// -- props --
let $mEl = null

// -- lifetime --
export function init() {
  // capture elements
  $mEl = document.getElementById("binder")

  // export interface
  return {
    show,
    hide,
  }
}

// -- commands --
async function show() {
  $mEl.classList.toggle("is-hidden", false)
}

async function hide() {
  $mEl.classList.toggle("is-hidden", true)
}
