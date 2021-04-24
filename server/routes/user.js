const express = require('express')
const router = express.Router()
const codeGenerator = require('adjective-adjective-animal')
const log = console.log

// Middleware and Helpers
const { adminOnly } = require('../utils/auth')
const { handleMongoError } = require('../utils/mongo')

// Mongo and Mongoose
const { User } = require('../db/models/user')
const { Survey } = require('../db/models/survey')

router.get('/session', async (req, res) => {
    res.json({ user: req.user })
})

router.post('/create', adminOnly, async (req, res) => {
    const { username } = req.body

    const user = new User({
        username,
        dateCreated: new Date(),
    });

    try {
        const savedUser = await user.save()
        res.status(200).json({ user: savedUser })
    } catch (error) {
        if (!handleMongoError(error)) {
            console.log(error)
            res.status(400).send('Bad request')
        }
    }
})

router.post('/generateInvite', adminOnly, async (req, res) => {
    try {
        const username = await codeGenerator()
  
        const user = new User({
            username,
            dateCreated: new Date(),
        })
        await user.save()

        res.status(200).json({ username })
    } catch (error) {
        if (!handleMongoError(error)) {
            console.log(error)
            res.status(400).send('Bad request')
        }
    }
})

router.post('/survey', async (req, res) => {
    const { responses } = req.body

    if (!responses) {
        log('No survey responses')
        res.status(400).send('Bad Request')
        return
    }

    if (req.user.isAdmin) {
        res.json({ success: false, message: 'Admins cannot submit surveys (conflict of interest, ya know?)' })
        return
    }

    if (req.user.completedSurvey) {
        res.json({ success: false, message: 'You have already submitted the survey' })
        return
    }

    try {
        const survey = new Survey({
            username: req.user.username,
            dateCreated: new Date(),
            responses,
        })
        await survey.save()
  
        req.user.completedSurvey = true
        await req.user.save()

        res.status(200).json({ success: true })
    } catch (error) {
        if (!handleMongoError(error)) {
            console.log(error)
            res.status(400).send('Bad request')
        }
    }
})

module.exports = router