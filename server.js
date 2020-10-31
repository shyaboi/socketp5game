var express = require('express');

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '../public/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
socket.on('userMove',  data => {console.log(data)})

});


http.listen(3000, () => {
  console.log('listening on *:3000');
});