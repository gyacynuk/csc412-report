const express = require('express')
const router = express.Router()
const log = console.log

// Middleware and Helpers
const { handleMongoError } = require('../utils/mongo')

// Mongo and Mongoose
const { User } = require('../db/models/user')
const { Survey } = require('../db/models/survey')

// Login, creating a new session
router.post('/login', async (req, res) => {
    try {
        // Ensure required fields are passed in
        const { username } = req.body
        if (!username) {
            log('No username given')
            res.status(400).send('Bad Request')
            return
        }

        // Load in user by username
        const user = await User.findOne({ username })
        if (!user) {
            log('No user found')
            res.status(401).send('Unauthenticated')
            return
        }

        // Load in survey record
        const survey = await Survey.findOne({ username })
        const hasCompletedSurvey = !!survey

        // The user was successfully authenticated, return the user model
        req.session.user = user._id
        res.send({ user, hasCompletedSurvey })
    } catch (error) {
        if (!handleMongoError(error)) {
            log(error)
            res.status(400).send('Bad request')
        }
    }
})

module.exports = router