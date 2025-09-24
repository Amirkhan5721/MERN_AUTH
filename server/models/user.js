const mongoose = require('mongoose');

const { Schema } = mongoose

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,     // Correct: required used WITH type
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;