const { Room } = require('../models/Room')
const { RoomCategory } = require('../models/RoomCategory')

createRoom = async (req, res) => {
    const body = req.body
    if (!body || !body.roomID) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Room ID'
        })
    }
    const roomID = body.roomID

    const room = new Room({
        roomID: roomID,
    })

    if (!room) {
        return res.status(400).json({
            success: false,
            error: err,
        })
    }
    room.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: room._roomID,
                message: 'Room created'
            })
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                message: 'Room not created',
            })
        })
};

getRooms = async (req, res) => {
    await Room.find()
        .then(rooms => {
            if (!rooms.length) {
                return res
                .status(404)
                .json({success: false, error: 'Rooms not found'})
            }
            return res.status(200).json({ success: true, data: rooms})
        }).catch(err => res.status(400).json({ success: false, error: err}))
}

getRoom = async (req, res) => {
    const roomID = req.body.roomID
    if (!roomID) {
        return res.status(400).json({
            success: false,
            message: 'Room ID cannot be empty'
        })
    }
    
    const room = await Room.findOne({ roomID: roomID})
    if (!room) {
        return res.status(404).json({
            success: false,
            message: `Room ${roomID}`,
        })
    }
}

module.exports = {
    createRoom,
    getRooms,

}