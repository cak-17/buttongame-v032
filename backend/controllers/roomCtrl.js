const { Room } = require('../models/Room')
const { RoomCategory } = require('../models/RoomCategory')

createRoom = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Room'
        })
    }
    const number = req.body.number
    const category = await RoomCategory.find().where('slug', req.body.roomCategorySlug)

    const room = new Room({
        number: number,
        category: category
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
                id: room._id,
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

createRoomCategory = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Room Category'
        })
    }

    const roomCategory = new RoomCategory(body)

    if (!roomCategory) {
        return res.status(400).json({
            success: false,
            error: err,
        })
    }
    roomCategory.save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: roomCategory._id,
                message: 'Room Category created'
            })
        })
        .catch((error) => {
            return res.status(400).json({
                success: false,
                message: 'Room Category not created',
            })
        })
}

getRoomCategories = async (req, res) => {
    await RoomCategory.find()
        .then(rooms => {
            if (!rooms.length) {
                return res
                .status(404)
                .json({success: false, error: 'Room Categories not found'})
            }
            return res.status(200).json({ success: true, data: rooms})
        }).catch(err => res.status(400).json({ success: false, error: err}))
}

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

module.exports = {
    createRoom,
    createRoomCategory,
    getRooms,
    getRoomCategories,
}