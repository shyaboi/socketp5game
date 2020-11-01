const { json } = require("express");
var express = require("express");
const PORT = process.env.PORT || 7777;
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "../public/index.html");
});
let userPool = [];

io.on("connection", (socket) => {
  console.log("a user connected");





  socket.on("connected", (user) => {
    userPool.push(user);
    socket.broadcast.emit("userPoolAdd", user);
    for (const user of userPool) {
      socket.emit("userPoolAdd", user);
    }
  });

  socket.on("userMove", (data) => {
    console.log(data)
    socket.emit("userPos", data);
    // socket.broadcast.emit("userPos", data);
  })
  // });

  // socket.on("userPos", (data) => {
  //     // console.log(data)
  //   socket.broadcast.emit("userPos", data);
  // });

  socket.on("disconnect", () => {
    for (var i = 0; i < userPool.length; i++) {
      if (userPool[i].id === socket.id) {
        userPool.splice(i, 1);
        i--;
      }
    }
    socket.broadcast.emit("userPool", userPool);
    socket.broadcast.emit("leaver", socket.id);
    });






});

http.listen(PORT, () => {
  console.log("listening on http://localhost:" + PORT);
});
