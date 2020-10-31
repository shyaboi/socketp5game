var socket = io();
const userID = socket.id
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
let userPool = []
var guy;
function setup() {
  createCanvas(1080, 720);
  // Starts in the middle
  // x = width / 2;
  // y = height / 2;
  // userPool.push()

   userPool.push(new User('1234', {x:50,y:77}))
  //  userPool.push(new User('3263467', 33,33))
console.log(userPool)
}


function draw() {
  background(200);

  // Draw a circle

//  doWork(x,y)
  // Moving up at a constant speed

for (user of userPool){
  user.render()
}
  // Reset to the bottom
  if (y < 0) {
    y = height;
  }
  if (x < 0) {
    x = width;
  }
}
