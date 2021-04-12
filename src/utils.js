// -- impls --
export function rand(max) {
  return Math.ceil(Math.random() * max)
}

export function wait(millis) {
  return new Promise((res, _rej) => {
    setTimeout(res, millis)
  })
}

export async function waitFrames(count = 1) {
  for (let i = count; i > 0; i--) {
    await waitFrame()
  }
}

function waitFrame() {
  return new Promise(requestAnimationFrame)
}
