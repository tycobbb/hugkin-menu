import { wait, waitFrames } from "./utils.js"

// -- commands --
async function show($el, animate) {
  $el.classList.toggle("is-animating", true)
  await waitFrames(2)
  $el.classList.toggle("is-showing", true)

  if (animate != null) {
    animate(true)
  }

  await finishShow($el, animate)
}

async function finishShow($el, animate) {
  await wait(1000)

  if (animate != null) {
    animate(false)
  }

  $el.classList.toggle("is-animating", false)
  $el.classList.toggle("is-showing", false)
  $el.classList.toggle("is-hidden", false)
}

async function hide($el, animate) {
  $el.classList.toggle("is-animating", true)
  $el.classList.toggle("is-hiding", true)

  if (animate != null) {
    animate(true)
  }

  finishHide($el, animate)

  await wait(300)
}

async function finishHide($el, animate) {
  await wait(1000)

  if (animate != null) {
    animate(false)
  }

  $el.classList.toggle("is-animating", false)
  $el.classList.toggle("is-hiding", false)
  $el.classList.toggle("is-hidden", true)
}

// -- exports --
export const view = {
  show,
  hide
}
