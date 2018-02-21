const socket = io();

socket.on('connect', () => {
    console.log('connected to the server');
    socket.on('newMessage', (body) => {
        console.log('New message:', body);
    });
});

socket.on('disconnect', () => {
    console.log('disconnected form server');
});