const ChatMsg = require('../models/ChatMsg')
const { logger } = require('../utils/logger')

const handleChatEvents = async (io, socket) => {
    const fetchedChatRecords = await ChatMsg.find({});
    io.emit('chatRecord', fetchedChatRecords);

    socket.on('chat message', async (msg) => {
        const chatMessage = new ChatMsg({
            userName: socket.data.username,
            content: msg,
        });
        try {
            const savedMessage = await chatMessage.save()
            logger.info(`${savedMessage.createdAt.toISOString()} | ${socket.data.username}: ${msg}`);
            io.emit('chat message', {
                msg,
                username: socket.data.username,
                isSystemMessage: false,
                timestamp: savedMessage.createdAt
            });
        } catch (error) {
            console.error(error)
        }

    });

}

module.exports = handleChatEvents;