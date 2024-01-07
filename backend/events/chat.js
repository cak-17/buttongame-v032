const ChatMsg = require('../models/ChatMsg')
const { logger } = require('../utils/logger')

const handleChatEvents = async (io, socket) => {
    const fetchedChatRecords = await ChatMsg.find({});

    io.emit('chatRecord', fetchedChatRecords);

    io.emit('get-last-50-msg', fetchedChatRecords.slice(-50))

    socket.on('chat message', async (data) => {
        if (!data) {
            logger.error('Empty message')
            return;
        }

        const chatMessage = new ChatMsg({
            userName: socket.data.username,
            content: data,
            isSystemMessage: false
        });

        try {
            const savedMessage = await chatMessage.save()
            io.emit('chat message', {
                content: data,
                userName: socket.data.username,
                isSystemMessage: savedMessage.isSystemMessage,
                timestamp: savedMessage.createdAt
            });
            logger.info(
                `${savedMessage.createdAt.toISOString()} | ${savedMessage.userName}: ${savedMessage.content}`
            )
        } catch (error) {
            console.error(error)
        }

    });

}

module.exports = handleChatEvents;
