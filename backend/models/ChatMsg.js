const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ChatMsg = new Schema(
    {
        userName: { type: String, required: true },
        content: { type: String, required: true },
        read: { type: Boolean, required: false, default: false},
    },
    {
        timestamps: true,
    }

)

module.exports = mongoose.model('chatmsg', ChatMsg)