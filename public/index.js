var socket = io();
const userID = socket.id;
// Where is the circle
let x, y;

let rot = Math.floor(Math.random(1)*255)
let gran = Math.floor(Math.random(1)*255)
let blau = Math.floor(Math.random(1)*255)


window.addEventListener("keydown", function (e) {
  if (e.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  let keyDown = e.key;
  if (keyDown === "a") {
    x = x - 10;
    let userPos = { id: socket.id, pos:{x:-10,y:0}};
    socket.emit("userMove", userPos);
  }

  if (keyDown === "d") {
    x = x + 10;
    let userPos = { id: socket.id, pos:{x:10,y:0} };
    socket.emit("userMove", userPos);
  }

  if (keyDown === "w") {
    y = y - 10;
    let userPos = { id: socket.id, pos:{x:0,y:-10} };
    socket.emit("userMove", userPos);
  }

  if (keyDown === "s") {
    y = y + 10;
    let userPos = { id: socket.id, pos:{x:0,y:10} };
    socket.emit("userMove", userPos);
  } else {
    //   console.log('notrhin')
  }
});
let userPool = [];


socket.on("userPos", (data) => {
  const uID = data.id
  var elementPos = userPool.map(function(x) {return x.id; }).indexOf(uID);
var objectFound = userPool[elementPos];

let okX = data.pos.x + objectFound.pos.x
console.log(okX)
let okY = data.pos.y + objectFound.pos.y
console.log(okY)
userPool[elementPos].pos = {x:okX,y:okY}
})


socket.on("userPoolAdd", (data) => {
rot = Math.floor(Math.random(1)*255)
gran = Math.floor(Math.random(1)*255)
 blau = Math.floor(Math.random(1)*255)
  var newUser = new User(data.id, data.pos, rot, gran, blau);
  userPool.push(newUser);
});

socket.on("leaver", (data) => {
  for (var i = 0; i < userPool.length; i++) {
    if (userPool[i].id === data) {
      userPool.splice(i, 1);
      i--;
    }
  }
});

var randX = () => {
  var num = Math.floor(Math.random(1) * width);
  return num;
};
var randY = () => {
  var num = Math.floor(Math.random(1) * height);
  return num;
};

function setup() {
  createCanvas(1080, 720);
  // Starts in the middle
  // x = width / 2;
  // y = height / 2;
  // if(userPool){

  //   console.log('pools closed')
  // }
  setTimeout(() => {
    var newGuy = new User(socket.id, { x: randX(), y: randY() });
    // userPool.push(newGuy);
    // console.log(newUser);
    socket.emit("connected", newGuy);
  }, 20);
}

// console.log(userPool)
function draw() {
  background(200);

  for (user of userPool) {
    user.render();
  }
  // Reset to the bottom

}
