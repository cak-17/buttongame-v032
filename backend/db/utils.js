const ChatMsg = require('../models/ChatMsg')
const Room = require("../models/Room")

async function findOrCreateRoom(roomID) {
    try {
        let room = await Room.findOne({ roomID });

        if (!room) {
            room = await Room.create({ roomID });
        }

        return room;
    } catch (error) {
        console.error('Error finding/creating room:', error);
        throw error;
    }
}

async function createChatMessage(userName, content, isSystemMessage, roomID) {
    try {
        // Find or create the room
        const room = await findOrCreateRoom(roomID);

        // Create a new chat message
        const chatMessage = new ChatMsg({
            userName,
            content,
            isSystemMessage,
            room: room._id,
        });

        // Save the chat message
        const savedMessage = await chatMessage.save();

        return savedMessage;
    } catch (error) {
        console.error('Error creating chat message:', error);
        throw error;
    }
}

// Example usage



module.exports = { createChatMessage, findOrCreateRoom }