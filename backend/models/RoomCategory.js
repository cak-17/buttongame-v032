const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomCategorySchema = new Schema({
	name: String,
	slug: {
		type: String,
		index: true,
	},
	description: String,
	capacity: Number,
})

module.exports = { RoomCategory:mongoose.model('RoomCategory', roomCategorySchema), roomCategorySchema }