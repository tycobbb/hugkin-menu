import { init as initMenu } from "./menu.js"

// -- props --
let mMenu = null
let mVisible = null

// -- lifetime --
async function main() {
  // wait for assets to load
  await document.fonts.ready
  await wait(100)

  // initialize screens
  mMenu = initMenu()

  // show screeen
  show(mMenu)

  // show ui
  mMenu.reveal()
}

// -- commands --
function show(screen) {
  mVisible = screen
}

// -- utils --
function wait(millis) {
  return new Promise((res, rej) => {
    setTimeout(res, millis)
  })
}

// -- bootstrap --
main()
