// -- props --
let $mEl = null

// -- lifetime --
export function screen() {
  // capture elements
  if ($mEl == null) {
    $mEl = document.getElementById("screen")
  }

  return $mEl
}
