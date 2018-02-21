const socket = io();

socket.on('connect', () => {
    console.log('connected to the server');

    socket.on('newMessage', (message) => {
        console.log('New message:', message);
    });
});

socket.on('disconnect', () => {
    console.log('disconnected form server');
});