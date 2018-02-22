const socket = io();

socket.on('connect', () => {
    console.log('connected to the server');

});
socket.on('newMessage', (message) => {
    $('#messages').append(`<li>${message.from}: ${message.text}</li>`);
});

socket.on('disconnect', () => {
    console.log('disconnected form server');
});

$('#message-form').on('submit', function(event) {
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: $('#message-form input[name=\'message\']').val()
    });
});