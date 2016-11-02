var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
var count = 0;

io.on('connection', function (socket) {
    count++;
    console.log(count);
    socket.broadcast.emit('userJoin', 'A new user joined');
    socket.broadcast.emit('userJoin', 'number of users : '+ count);
    console.log('Client connected');

    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
});

io.on('connection', function(client) {
  client.on('join', function(name) {
    client.nickname = name;
  });
  client.on('messages', function(data) {
    var nickname = client.nickname;
    client.broadcast.emit('message', nickname + ': ' + message);
  });
});

server.listen(process.env.PORT || 8080);
