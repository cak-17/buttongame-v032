const express = require('express');
const roomCtrl = require('../controllers/roomCtrl')

const router = express.Router();

router.get('/rooms', roomCtrl.getRooms)
router.post('/rooms', roomCtrl.createRoom)

router.post('/rooms/categories', roomCtrl.createRoomCategory)
router.get('/rooms/categories', roomCtrl.getRoomCategories)

module.exports = router;