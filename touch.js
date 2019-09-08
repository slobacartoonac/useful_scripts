// written by Slobodan Zivkovic slobacartoonac@gmail.com

function Touch(div, deadzone) {
  const link = this
  this.deadzone = deadzone
  this.clear()
  function distance2d(a, b) {
    return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
  }
  this.distance = distance2d
  let startMove = null
  let thisMove = null
  let mouseDown = false
  let click = true
  function moveTouchT(e) {
    e.preventDefault()
    const { top, left } = e.target.getBoundingClientRect()
    moveTouch({ x: e.touches[0].clientX - left, y: e.touches[0].clientY - top })
  }
  function moveTouchM(e) {
    e.preventDefault()
    const { top, left } = e.target.getBoundingClientRect()
    if (mouseDown) moveTouch({ x: e.clientX - left, y: e.clientY - top })
  }
  function moveTouch(e) {
    if (startMove == null) {
      startMove = { x: e.x, y: e.y }
      thisMove = { x: e.x, y: e.y }
      link.triger('start', thisMove)
      click = true
    } else {
      const delta = { x: e.x - thisMove.x, y: e.y - thisMove.y }
      thisMove = { x: e.x, y: e.y }
      const direction = {
        x: thisMove.x - startMove.x,
        y: thisMove.y - startMove.y,
      }
      link.triger('force', {
        delta,
        direction,
        startPosition: startMove,
        position: thisMove,
        distance: distance2d(startMove, thisMove),
        click,
      })
      if (distance2d(startMove, thisMove) > link.deadzone) {
        click = false
        if (Math.abs(direction.x) > Math.abs(direction.y)) {
          if (direction.x > 0) {
            link.triger('left')
          } else {
            link.triger('right')
          }
        } else if (direction.y > 0) {
          link.triger('down')
        } else {
          link.triger('up')
        }
      }
    }
  }
  //= {up:[],down:[],left:[],right:[],stop:[],click:[],force:[]}
  function stopTouch(e) {
    e.preventDefault()
    if (click) {
      if (e.button) {
        if (e.button === 1) link.triger('bmiddle')
        if (e.button === 2) link.triger('bright')
      } else link.triger('click', startMove)
    }
    link.triger('stop')
    startMove = null
    thisMove = null
    mouseDown = false
  }
  div.addEventListener(
    'touchstart',
    e => {
      e.preventDefault()
    },
    false,
  )
  div.addEventListener('touchmove', moveTouchT, false)
  div.addEventListener('touchend', stopTouch, false)
  div.addEventListener('touchstart', moveTouchT, false)
  div.addEventListener('mouseleave', stopTouch, false)
  div.addEventListener('mousemove', moveTouchM)
  div.addEventListener('mouseup', stopTouch)
  div.addEventListener('mousedown', e => {
    mouseDown = true
    moveTouchM(e)
  })
}
/*eslint-disable */
Touch.prototype.sub = function(ev, func) {
  if (this.events[ev]) this.events[ev].push(func)
}
Touch.prototype.unsub = function(ev, func) {
  if (this.events[ev])
    this.events[ev] = this.events[ev].filter(fu => fu !== func)
}
Touch.prototype.clearEvlent = function(ev) {
  if (this.events[ev]) this.events[ev] = []
}
Touch.prototype.clear = function() {
  this.events = {
    up: [],
    down: [],
    left: [],
    right: [],
    stop: [],
    start: [],
    click: [],
    force: [],
    bmiddle: [],
    bright: [],
  }
}
Touch.prototype.triger = function(ev, args) {
  if (this.events[ev])
    this.events[ev].forEach(func => {
      func(args)
    })
}
/* eslint-enable */
module && module.exports = Touch
