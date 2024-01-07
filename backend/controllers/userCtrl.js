const User = require('../models/User')
const { logger } = require('../utils/logger')

getAll = async (req, res) => {
    await User.find()
        .then(users => {
            if (!users.length) {
                return res.status(404).json({
                    success: false,
                    message: 'Users not found'
                })
            }

            return res.status(200).json({
                success: true,
                data: users
            })
        }).catch(err => {
            logger.error("getAll() ->", err)
            res.status(400).json({
                success: false,
                error: err,
                message: 'Users not found'
            })
        })
}

register = async (req, res) => {
    const body = req.body
    console.log(req.body)

    if (!body) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
            body: body
        })
    }
    const user = new User({
        username: body.username,
        email: body.email,
        isSu: false,
        isStaff: false
    })


    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User was not created',
        })
    }

    user.setPassword(req.body.password)

    user.save()
        .then(user => {
            return res.status(200).json({
                success: true,
                data: user._id,
                message: 'User was successfully created'
            })
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                message: 'User was not created',
                error: error
            })
        })
}
login = async (req, res) => {
    await User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                })
            }

            if (!user.validPassword(req.body.password)) {
                return res.status(403).json({
                    success: false,
                    message: 'Password not valid'
                })
            }
            return res.status(200).json({
                success: true,
                data: user,
                token: `${user._id}`
            })
        }).catch(err => {
            console.log(err)
            res.status(400).json({ success: false, message: err.message, error: err })
        })
}

resetPassword = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required',
            body: req.body
        })
    }

    const oldPassword = req.body.oldPassword;
    const newPassword1 = req.body.newPassword1;
    const newPassword2 = req.body.newPassowrd2;
    const username = req.body.username

    await User.findOne({username:username})
        .then(user => {
            if (newPassword1 === newPassword2) {
                if (user.resetPassword(oldPassword, newPassword1))
                    res.status(200).json({
                    success: true,
                    message: 'Password was reset'
                })
            }
        }).catch(err => res.status(400).json({
            message: err.message,
            success: false,
            error: err,
        }))

}
module.exports = {
    login,
    getAll,
    register,
    resetPassword
}