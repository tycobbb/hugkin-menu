import { view } from "./view.js"
import { rand } from "./utils.js"

// -- props --
let $mEl = null

// -- lifetime --
export function init() {
  // capture elements
  $mEl = document.getElementById("binder")

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
  const $cards = document.querySelectorAll(".Card-image")

  // rotate all the cards slightly
  let dir = 1
  for (const $el of $cards) {
    const ta = dir * rand(3)
    $el.dataset.ta = ta
    $el.style.transform = `rotate(${ta}deg)`
    dir = -dir
  }

  // determine inset to center last card
  const $card = $cards[0]
  const $phon = document.querySelector(".Phone-screen")

  const ph = $phon.getBoundingClientRect().height
  const ch = $card.height
  const inset = (ph - ch) / 2;

  // pad list by inset
  const $list = document.querySelector(".CardList")
  $list.style.paddingBottom = `${inset}px`
}

async function show() {
  await view.show($mEl)
}

async function hide() {
  await view.hide($mEl)
}
