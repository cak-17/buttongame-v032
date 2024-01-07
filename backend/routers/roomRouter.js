const express = require('express');
const roomCtrl = require('../controllers/roomCtrl')

const router = express.Router();

router.get('/rooms', roomCtrl.getRooms)
router.post('/rooms', roomCtrl.createRoom)
router.post('/room', roomCtrl.getRoom)

module.exports = router;