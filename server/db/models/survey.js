const mongoose = require('mongoose')

const SurveySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    },
    responses: {
        type: [
            new mongoose.Schema({
                track: {
                    type: String,
                    required: true
                },
                source: {
                    type: String,
                    required: true
                },
                expected: {
                    type: Boolean,
                    required: true
                },
                answer: {
                    type: Boolean,
                    required: true
                },
                isCorrect: {
                    type: Boolean,
                    required: true
                }
            })
        ],
        required: true
    }
})

const Survey = mongoose.model('Survey', SurveySchema);

module.exports = { Survey };