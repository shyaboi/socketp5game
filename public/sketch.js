var socket = io.connect('/');
const userID = socket.id;
// Where is the circle
let x, y;

let rot = Math.floor(Math.random(1)*255)
let gran = Math.floor(Math.random(1)*255)
let blau = Math.floor(Math.random(1)*255)

let wOnCoolDown = false
let aOnCoolDown = false
let sOnCoolDown = false
let dOnCoolDown = false



window.addEventListener("keydown", function (e) {
  let ogCol = color(86, 163, 47);
  let coolDownCol = color(255, 85, 0);
  if (e.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  let keyDown = e.key;
  
  if (keyDown === "w") {
    if (wOnCoolDown){return}
    setTimeout(() => {
      wOnCoolDown=false
      wButton.style('background-color', ogCol);
    }, 3000);
    console.log(wOnCoolDown)
    wOnCoolDown = true
    wButton.style('background-color', coolDownCol);

    let userPos = { id: socket.id, pos:{x:0,y:-50} };
    socket.emit("userMove", userPos);
  }


  if (keyDown === "a") {
    if (aOnCoolDown){return}
    aOnCoolDown=true
    aButton.style('background-color', coolDownCol);

    setTimeout(() => {
      aOnCoolDown=false
      aButton.style('background-color', ogCol);

    }, 3000);
    let userPos = { id: socket.id, pos:{x:-50,y:0}};
    socket.emit("userMove", userPos);
  }
  
  if (keyDown === "s") {
    if (sOnCoolDown){return}
    sOnCoolDown=true
    sButton.style('background-color', coolDownCol);

    setTimeout(() => {
      sOnCoolDown=false
      sButton.style('background-color', ogCol);

    }, 3000);
    let userPos = { id: socket.id, pos:{x:0,y:50} };
    socket.emit("userMove", userPos);
  } else {
    //   console.log('notrhin')
  }

  if (keyDown === "d") {
    if (dOnCoolDown){return}
    dOnCoolDown=true
    dButton.style('background-color', coolDownCol);

    setTimeout(() => {
      dOnCoolDown=false
      dButton.style('background-color', ogCol);

    }, 3000);
    let userPos = { id: socket.id, pos:{x:50,y:0} };
    socket.emit("userMove", userPos);
  }


});
let userPool = [];


socket.on("userPos", (data) => {
  const uID = data.id
  var elementPos = userPool.map(function(x) {return x.id; }).indexOf(uID);
var objectFound = userPool[elementPos];

let okX = data.pos.x + objectFound.pos.x
// console.log(okX)
let okY = data.pos.y + objectFound.pos.y
// console.log(okY)
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
  frameRate(120);
  wButton = createButton("⇧");
  wButton.size(75,50);
  wButton.position(20,740);

  aButton = createButton("⇦");
  aButton.size(75,50);
  aButton.position(100,740);

  sButton = createButton("⇩");
  sButton.size(75,50);
  sButton.position(180,740);

  dButton = createButton("⇨");
  dButton.size(75,50);
  dButton.position(260,740);
  setTimeout(() => {
    var newGuy = new User(socket.id, { x: randX(), y: randY() });
    // userPool.push(newGuy);
    // console.log(newUser);
    socket.emit("connected", newGuy);
  }, 1000);
}
if (wOnCoolDown) {
  console.log('cool down')  
}


function draw() {
  background(200);

  for (user of userPool) {
    user.render();
  }
  // Reset to the bottom

}
