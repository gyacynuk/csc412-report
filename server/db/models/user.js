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
    },
    completedSurvey: {
        type: Boolean,
        default: false,
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = { User };
