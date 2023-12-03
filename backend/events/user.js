const { logger } = require('../utils/logger')

const handleUserEvents = (io, socket) => {
    socket.on('user joined', (username) => {
        logger.info(`${username} joined the chat`)
        io.emit('chat message', {
            msg: `${username} joined the chat`,
            username: username,
            isSystemMessage: true,
            timestamp: false,
        });
    });

    socket.on('user left', (username) => {
        logger.info(`${username} left the chat`)
        io.emit('chat message', {
            msg:`${username} left the chat`,
            username: username,
            isSystemMessage: true,
            timestamp: false,
        });
    });


    //set username
    io.emit('setNick', socket.data.username);
    //show user logged
    io.emit('chat message', { 
        msg:`${socket.data.username} joined the party`, 
        username: socket.data.username, 
        isSystemMessage:true, 
        timestamp: null
    });
    logger.info(`${socket.data.username} is connected!`);
};

module.exports = handleUserEvents;
