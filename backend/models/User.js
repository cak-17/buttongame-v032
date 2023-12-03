const mongoose = require('mongoose');
const {Schema} = mongoose;
const { sha3_256 } = require('js-sha3')

const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new Schema({
	username: {
		type: String,
		lowercase: true,
		unique: true,
		required: [ true, "Can't be blank"],
		match: [/^[a-zA-Z0-9]+$/, "is invalid"],
		index: true,
	},
	email: {
		type: String,
		lòwercase: true,
		unique: true,
		required: [ true, "Can't be blank"],
		match: [/\S+@\S+\.\S+/, 'is invalid'],
		index: true,
	},
	firstName: String,
	lastName: String,
	password: String,
	isSu: Boolean,
	isStaff: Boolean,
}, {
	timestamps: true,
	virtuals: {
		fullName: {
			get() { return `${this.firstName} ${this.lastName}`; },
			set(v) {
				const firstName = v.substring(0, v.indexOf(' '));
				const lastName = v.substring(v.indexOf(' ') + 1);
				this.set({ firstName, lastName });
			}
		}
	}
});

userSchema.methods.setPassword = function(password) {
	this.password = sha3_256(password)
}

userSchema.methods.validPassword = function(password) {
	return this.password === sha3_256(password);
}

userSchema.methods.resetPassword = function(oldPassword, newPassword) {
	if (this.validPassword(oldPassword)) {
		return this.setPassword(newPassword)
	}
	return false
}


userSchema.plugin(uniqueValidator, { message: 'is already taken'});

module.exports = mongoose.model('User', userSchema);