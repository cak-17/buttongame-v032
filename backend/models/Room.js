const mongoose = require('mongoose');
const { Schema } = mongoose;
const { roomCategorySchema } = require('./RoomCategory')


const roomStatus = {
	AVL: 'Available',
	OCC: 'Occupied',
	OOO: 'Out of Order',
};

const roomSchema = new Schema({
	number: Number,
	status: {
		type: String,
		enum: Object.keys(roomStatus),
		default: 'AVL',
	},
	category: roomCategorySchema,
}, { timestamps: true })


module.exports = { Room:mongoose.model('Room', roomSchema), roomSchema}

