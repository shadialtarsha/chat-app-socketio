const socket = io();
const messageForm = $('#message-form');
const sendLocationButton = $('#send-location');

const scrollToBottom = () => {
    //Selectors
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child');
    //Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', () => {
    const params = $.deparam(window.location.search);
    socket.emit('join', params, (err) => {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('disconnect', () => {
    console.log('disconnected form server');
});

socket.on('updateUserList', (users) => {
    const ol = $('<ol></ol>');
    users.forEach((user) => {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

socket.on('newMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');

    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', (message) => {
    const formattedTime = moment(message.createdAt).format('h:mm a');

    const template = $('#location-message-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });

    $('#messages').append(html);
    scrollToBottom();
});

messageForm.on('submit', function(event) {
    const messageTextBox = $('#message-form input[name=\'message\']');
    event.preventDefault();
    socket.emit('createMessage', {
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
    });
});