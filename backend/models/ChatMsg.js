const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Room = require('./Room')

const ChatMsg = new Schema(
    {
        userName: { type: String, required: true },
        content: { type: String, required: true },
        read: { type: Boolean, required: false, default: false},
        isSystemMessage: { type: Boolean, required: false, default: false},
        room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true
        }
    },
    {
        timestamps: true,
    }

)

module.exports = mongoose.model('chatmsg', ChatMsg)