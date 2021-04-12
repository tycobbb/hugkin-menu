// -- impls --
export function rand(max) {
  return Math.ceil(Math.random() * max)
}

export function wait(millis) {
  return new Promise((res, _rej) => {
    setTimeout(res, millis)
  })
}

export function waitFrame() {
  return new Promise((res, _rej) => {
    requestAnimationFrame(res)
  })
}
