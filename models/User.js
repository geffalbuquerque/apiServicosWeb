const mongoose = require('mongoose')

const User = mongoose.model('User', {
    name: String,
    email: String,
    oab: Number,
    password: String
});

module.exports = User;