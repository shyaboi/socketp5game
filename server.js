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
let userPool = []

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("connected", (user) => {
    // const newUser = JSON.parse(user)
  console.log(user)
  // userPool.push(user)
  // console.log(userPool);

})
  socket.on("userMove", (data) => {
    socket.emit("userPos", data);
    socket.broadcast.emit("userPos", data);

  });

  socket.on("userPos", (data) => {
      // console.log(data)
    socket.broadcast.emit("userPos", data);
  });
});

http.listen(PORT, () => {
  console.log("listening on http://localhost:" + PORT);
});
