const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        required: true
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = { User };
