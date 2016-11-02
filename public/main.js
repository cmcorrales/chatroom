$(document).ready(function() {
    var socket = io('http://localhost:8080');
    var input = $('input');
    var messages = $('#messages');

    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    socket.on('message', addMessage);
    socket.on('userJoin', addMessage);
    socket.on('count', addMessage);
    var nickname = prompt("What is your nickname?");
    server.emit('join', nickname)
});
