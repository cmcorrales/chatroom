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
    socket.broadcast.emit('userJoin', 'A new user joined');
    console.log('Client connected');

    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
});

server.listen(process.env.PORT || 8080);
