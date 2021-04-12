import { view } from "./view.js"
import { rand, wait } from "./utils.js"

// -- props --
let $mScreen = null
let $mEl = null
let $mList = null
let $mCards = null
let $mImages = null

// -- lifetime --
export function init() {
  // capture elements
  $mScreen = document.getElementById("screen")
  $mEl = document.getElementById("binder")
  $mList = $mEl.querySelector(".CardList")
  $mCards = $mEl.querySelectorAll(".Card")
  $mImages = $mEl.querySelectorAll(".Card-image")

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
  // rotate all the cards slightly
  let dir = 1
  for (const $card of $mImages) {
    const ta = dir * rand(3)
    $card.dataset.ta = ta
    dir = -dir
  }

  // determine inset to center last card
  const ph = $mScreen.getBoundingClientRect().height
  const ih = $mImages[0].height
  const inset = (ph - ih) / 2;

  // pad list by inset
  $mList.style.paddingBottom = `${inset}px`
}

async function show() {
  $mList.style.transform = `translateX(150px) rotate(${-15 + rand(-15)}deg)`

  for (const $card of $mCards) {
    $card.style.height = "0px"
  }

  for (const $card of $mImages) {
    $card.style.transform = ""
  }

  await view.show($mEl, (animating) => {
    if (animating) {
      $mList.style.transform = ""
    }
  })

  for (const $card of $mCards) {
    $card.style.height = ""
  }

  for (const $card of $mImages) {
    const ta = $card.dataset.ta
    $card.style.transform = `rotate(${ta}deg)`
  }
}

async function hide() {
  await view.hide($mEl)
}
