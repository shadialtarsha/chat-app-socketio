require('./../config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public/')));

io.on('connection', (socket) => {

    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

    socket.on('createMessage', (message) => {

        console.log(`Create a new Message: ${JSON.stringify(message)}`);

        io.emit('newMessage', generateMessage(message.from, message.text));

    });

    socket.on('disconnect', () => {
        console.log('Client was disconnected');
    });

});

server.listen(process.env.PORT, () => {
    console.log('Server is running....', process.env.PORT);
});