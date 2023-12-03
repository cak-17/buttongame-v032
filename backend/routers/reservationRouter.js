const express = require('express')
const router = express.Router();
const reservationCtrl = require('../controllers/reservationCtrl')

router.post('/book', reservationCtrl.book)
router.get('/reservations', reservationCtrl.getAll)

module.exports = router;