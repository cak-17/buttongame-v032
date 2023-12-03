const express = require('express');
const userCtrl = require('../controllers/userCtrl')

const router = express.Router()

router.post('/login', userCtrl.login)
router.post('/register', userCtrl.register)
router.get('/users', userCtrl.getAll)
router.post('/password-reset', userCtrl.resetPassword)
module.exports = router;