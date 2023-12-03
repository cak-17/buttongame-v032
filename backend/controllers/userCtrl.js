const { sha3_256 } = require('js-sha3')
const User = require('../models/User')

getAll = async (req, res) => {
    await User.find()
        .then(users => {
            if (!users.length) {
                return res.status(404).json({
                    success: false,
                    error: 'Users not found'
                })
            }

            return res.status(200).json({
                success: true,
                data: users
            })
        }).catch(err => {
            console.log(err)
            res.status(400).json({ success: false, error: err })
        })
}

register = (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(200).json({
            success: false,
            error: 'All fields are required'
        })
    }

    const user = new User(body)


    if (!user) {
        return res.status(400).json({
            success: false,
            error: err,
        })
    }


    user.setPassword(req.body.password)

    console.log(user.password)

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
                message: 'User was not created'
            })
        })
}
login = async (req, res) => {
    await User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    succesS: false,
                    error: 'User not found'
                })
            }

            if (!user.validPassword(req.body.password)) {
                return res.status(403).json({
                    success: false,
                    error: 'Password not valid'
                })
            }
            return res.status(200).json({
                success: true,
                data: user,
            })
        }).catch(err => {
            console.log(err)
            res.status(400).json({ success: false, error: err })
        })
}

resetPassword = async (req, res) => {
    const oldPassword = req.body.oldPassword;
    const newPassword1 = req.body.newPassword1;
    const newPassword2 = req.body.newPassowrd2;

    await User.findById(req.body.userId)
        .then(user => {
            if (newPassword1 === newPassword2) {
                if (user.resetPassword(oldPassword, newPassword1))
                    res.status(200).json({
                    success: true,
                    message: 'Password was reset'
                })
            }
        }).catch(err => res.status(400).json({
            success: false,
            message: err.message,
        }))

}
module.exports = {
    login,
    getAll,
    register,
    resetPassword
}