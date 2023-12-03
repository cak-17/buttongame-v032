const User = require('../models/User')
const { sha3_256 } = require('js-sha3')

const mockUser = {
    username:"test1",
    firstName:"test name",
    lastName:"test last",
    password:"test",
    isSu:true,
    isStaff:true,
}

// to rewrite
