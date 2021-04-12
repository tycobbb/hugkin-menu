import { rand, wait } from "./utils.js"

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
    present,
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

function present() {
  $mEl.classList.toggle("is-loading", false)
}

async function show() {
  $mEl.classList.toggle("is-hidden", false)
}

async function hide() {
  $mEl.classList.toggle("is-hiding", true)

  for (const $el of $mLines) {
    const tx = -kMaxOffset2 + Math.random(kMaxOffset)
    const ty = -kMaxOffset2 + Math.random(kMaxOffset)
    $el.style.transform = `translate(${tx}px, ${ty}px)`
  }

  await wait(300)

  $mEl.classList.toggle("is-hiding", false)
  $mEl.classList.toggle("is-hidden", true)
}
