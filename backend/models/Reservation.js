const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { roomSchema } = require('./Room')
const reservationStatus = {
	PEN: 'Pending',
	CON: 'Confirmed',
	CAN: 'Cancelled',
    FUL: 'Fulfilled',
};


const reservationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    room: roomSchema,
    // add checkin checkout validation
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date
    },
    status: {
		type: String,
		enum: Object.keys(reservationStatus),
		default: 'PEN',
	},
}, {
    timestamps: true,
})

module.exports = mongoose.model('Reservation', reservationSchema)