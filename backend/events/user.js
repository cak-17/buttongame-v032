const { logger } = require('../utils/logger')
const { createChatMessage } = require("../db/utils")
const User = require('../models/User');

const handleUserEvents = (io, socket) => {
    //set username
    //TODO: implement and change to 'set-username'

    const user = socket.data.user.username
    io.emit('setNick', user);

    socket.on('set-username', async userName => {
        await User.findOne({ username: user})
            .then((obj) => {
                obj.username = userName
                obj.save()
                    .then(() => res.status(200).json({
                            success: true,
                            message: 'Username was changed'
                        })
                    )
                    .catch(err => res.status(400).json({
                        success: false,
                        error: err,
                        message: 'Username was not changed',
                    }))
            })
            .catch(err => res.status(400).json({
                success: false,
                error: err,
                message: 'User not found',
            }))
    })

    //show user logged
    socket.on('join room', async (roomID) => {
        socket.join(roomID);
        const data = `${user} joined the party ${roomID}`

        createChatMessage(user, data, true, roomID)
            .then((savedMessage) => {
                io.emit('chat message', {
                    content: data,
                    userName: user,
                    isSystemMessage: true,
                    timestamp: savedMessage.createdAt
                });
                logger.info(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    })

    socket.on('leave room', async (roomID) => {
        socket.leave(roomID)
        const data = `${user} left the party ${roomID}`

        createChatMessage(user, data, true, roomID)
            .then((savedMessage) => {
                io.emit('chat message', {
                    content: data,
                    userName: user,
                    isSystemMessage: true,
                    timestamp: savedMessage.createdAt
                });
                logger.info(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    })



};

module.exports = handleUserEvents;
