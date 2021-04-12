// -- constants --
const kMaxOffset = 20
const kMaxOffset2 = kMaxOffset / 2

// -- props --
let $mEl = null

// -- lifetime --
export function init() {
  // capture elements
  $mEl = document.getElementById("menu")

  // prepare ui
  prepare()

  // export interface
  return {
    reveal,
  }
}

// -- commands --
function prepare() {
  // shift lines right
  const $shifted = $mEl.querySelectorAll(".Menu-line")

  let offset = 0
  for (const $el of $shifted) {
    if (offset >= kMaxOffset2) {
      offset = rand(offset)
    } else {
      offset = offset + rand(kMaxOffset - offset)
    }

    $el.style.transform = `translateX(${offset}px)`
  }

  // shift notes down
  const $notes = $mEl.querySelectorAll(".Menu-note")
  for (const $el of $notes) {
    $el.style.transform = `translateY(${2 + rand(3)}px)`
  }
}

function reveal() {
  $mEl.classList.toggle("is-loading", false)
}

// -- utils --
function rand(max) {
  return Math.ceil(Math.random() * max)
}
