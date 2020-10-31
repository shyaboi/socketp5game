var socket = io();

// Where is the circle
let x, y;

window.addEventListener("keydown", function (e) {
  if (e.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  let keyDown = e.key;
  if (keyDown === "a") {
    x = x - 10;
    let userPos = {id:socket.id,x:x,y:y}
socket.emit('userMove', userPos)
console.log(sizeof(userPos))
  }

  if (keyDown === "d") {
    x = x + 10;
    let userPos = {id:socket.id,x:x,y:y}
socket.emit('userMove', userPos)
  }

  if (keyDown === "w") {
    y = y - 10;
    let userPos = {id:socket.id,x:x,y:y}
socket.emit('userMove', userPos)
  }

  if (keyDown === "s") {
    y = y + 10;
    let userPos = {id:socket.id,x:x,y:y}
socket.emit('userMove', userPos)
  } else {
    //   console.log('notrhin')
  }
});

function setup() {
  createCanvas(1080, 720);
  // Starts in the middle
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(200);

  // Draw a circle
  stroke(50);
  fill(100);
  ellipse(x, y, 24, 24);

  // Moving up at a constant speed

  // Reset to the bottom
  if (y < 0) {
    y = height;
  }
}
