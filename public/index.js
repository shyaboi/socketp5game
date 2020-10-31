var socket = io();
const userID = socket.id
// Where is the circle
let x, y;
let user = {userID, x,y};



class Thing  {
      constructor(id, pos){
        this.id = id
        this.pos = pos = {x,y}
      }
}


console.log(user);

socket.on("connection", ()=> {
  user = {userID:data.id, x:data.x, y:data.y};
});

socket.on("userPos", data => {
  // console.log(data.id);
  user = {userID:data.id, x:data.x, y:data.y};
  console.log(user)
});

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

function setup() {

 

  createCanvas(1080, 720);
  // Starts in the middle
  x = width / 2;
  y = height / 2;
  
  setTimeout(() => {
    console.log(socket.id)
    user = {userID:socket.id, x:y, y:y};
    socket.emit('userPos', user);
    var newUser = new Thing(socket.id, {x:x,y:y})
    console.log(newUser)
  }, 8);

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
  if (x < 0) {
    x = width;
  }
}
