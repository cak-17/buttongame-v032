const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('./User');

const roomSchema = new Schema({
	roomID: {
		type: String,
		required: true,
		unique: true,
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	isPrivate: {
		type: Boolean,
		default: false
	},
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
}, { timestamps: true })

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;