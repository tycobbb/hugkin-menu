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

function show(screen) {
  if (mVisible === screen) {
    return
  }

  if (mVisible != null) {
    mVisible.hide()
  }

  mVisible = screen
  mVisible.show()
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
