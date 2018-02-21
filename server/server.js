require('./../config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public/')));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('createMessage', (message) => {
        console.log(`Create a new Message: ${JSON.stringify(message)}`);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    });

    socket.on('disconnect', () => {
        console.log('Client was disconnected');
    });

});

server.listen(process.env.PORT, () => {
    console.log('Server is running....', process.env.PORT);
});