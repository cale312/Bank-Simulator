const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String,
    cellNumber: Number,
    loggedIn: Boolean,
    account: Boolean,
    role: String
});

var user = mongoose.model('users', userSchema);

module.exports = user;