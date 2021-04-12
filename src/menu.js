import { view } from "./view.js"
import { rand } from "./utils.js"

// -- constants --
const kMaxOffset = 20
const kMaxOffset2 = kMaxOffset / 2

// -- props --
let $mEl = null
let $mLines = null

// -- lifetime --
export function init() {
  // capture elements
  $mEl = document.getElementById("menu")
  $mLines = $mEl.querySelectorAll(".Menu-line")

  // prepare ui
  prepare()

  // export interface
  return {
    show,
    hide,
  }
}

// -- commands --
function prepare() {
  // shift lines right
  let offset = 0
  for (const $el of $mLines) {
    if (offset >= kMaxOffset2) {
      offset = rand(offset)
    } else {
      offset = offset + rand(kMaxOffset - offset)
    }

    $el.dataset.tx = offset
    $el.style.transform = `translateX(${offset}px)`
  }

  // shift notes down
  const $notes = $mEl.querySelectorAll(".Menu-note")
  for (const $el of $notes) {
    $el.style.transform = `translateY(${-5 + rand(10)}px)`
  }
}

async function show() {
  await view.show($mEl)
}

async function hide() {
  await view.hide($mEl, (animating) => {
    if (animating) {
      for (const $el of $mLines) {
        const tx = -60 - rand(20)
        const ty = -kMaxOffset2 + rand(kMaxOffset)
        const ta = -15 + rand(30)
        $el.style.transform = `translate(${tx}px, ${ty}px) rotate(${ta}deg)`
      }
    } else {
      for (const $el of $mLines) {
        $el.style.transform = `translate(${$el.dataset.tx}px)`
      }
    }
  })
}
