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
    const tx = -60 - rand(20)
    const ty = -kMaxOffset2 + rand(kMaxOffset)
    const ta = -15 + rand(30)
    $el.style.transform = `translate(${tx}px, ${ty}px) rotate(${ta}deg)`
  }

  hide2()

  await wait(300)
}

async function hide2() {
  await wait(1000)

  for (const $el of $mLines) {
    $el.style.transform = `translate(${$el.dataset.tx}px)`
  }

  $mEl.classList.toggle("is-hiding", false)
  $mEl.classList.toggle("is-hidden", true)
}
