const socket = io();
const sendLocationButton = $('#send-location');

socket.on('connect', () => {
    console.log('connected to the server');

});

socket.on('newMessage', (message) => {
    $('#messages').append(`<li>${message.from}: ${message.text}</li>`);
});

socket.on('disconnect', () => {
    console.log('disconnected form server');
});

socket.on('newLocationMessage', (message) => {
    $('#messages').append(`<li>${message.from}: <a href="${message.url}" target="_blank">My current location</li>`);
});

$('#message-form').on('submit', function(event) {
    const messageTextBox = $('#message-form input[name=\'message\']');
    event.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, () => {
        messageTextBox.val('');
    });
});

sendLocationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geo location is not supported by your browser');
    }

    sendLocationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition((position) => {
        sendLocationButton.removeAttr('disabled');
        sendLocationButton.text('Sending location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, () => {
        sendLocationButton.removeAttr('disabled');
        sendLocationButton.text('Sending location');
        alert('Unable to fetch location.');
    })
});