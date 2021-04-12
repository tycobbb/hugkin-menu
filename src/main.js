import { init as initMenu } from "./menu.js"
import { init as initBinder } from "./binder.js"
import { wait, waitFrame } from "./utils.js"

// -- props --
let mMenu = null
let mBinder = null
let mVisible = null

// -- lifetime --
async function main() {
  // initialize
  initEvents()

  // wait for assets to load
  await document.fonts.ready
  await wait(100)

  // initialize screens
  mMenu = initMenu()
  mBinder = initBinder()

  // show screeen
  showCurrent()

  // show ui
  await waitFrame()
  mMenu.present()
}

// -- commands --
function showCurrent() {
  switch (document.location.hash) {
    case "#binder":
      show(mBinder); break
    default:
      show(mMenu); break
  }
}

async function show(next) {
  if (mVisible === next) {
    return
  }

  // update state
  const prev = mVisible
  mVisible = next

  // run animations
  if (prev != null) {
    await prev.hide()
  }

  if (next != null) {
    await next.show()
  }
}

// -- events -
function initEvents() {
  window.addEventListener("hashchange", didChangeHash)
}

function didChangeHash() {
  showCurrent()
}

// -- bootstrap --
main()
