var express = require("express");
const PORT = process.env.PORT || 7777;
var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "../public/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("userMove", (data) => {
    socket.emit("userPos", data);
    console.log(data);
  });

  socket.on("userPos", (data) => {
      console.log(data)
    socket.broadcast.emit("userPos", data);
  });
});

http.listen(PORT, () => {
  console.log("listening on http://localhost:" + PORT);
});
