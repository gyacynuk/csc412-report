const express = require('express')
const router = express.Router()
const codeGenerator = require('adjective-adjective-animal')
const log = console.log

// Middleware and Helpers
const { comparePasswordAsync } = require('../utils/auth')
const { handleMongoError } = require('../utils/mongo')

// Mongo and Mongoose
const { User } = require('../db/models/user')

router.post('/create', async (req, res) => {
    const { username } = req.body

    const user = new User({
        username,
        dateCreated: new Date(),
    });

    try {
        const savedUser = await user.save()
        res.status(200).send({ user: savedUser })
    } catch (error) {
        if (!handleMongoError(error)) {
            console.log(error)
            res.status(400).send('Bad request')
        }
    }
})

router.post('/generateInvite', async (req, res) => {
    try {
        const username = await codeGenerator()
  
        const user = new User({
            username,
            dateCreated: new Date(),
        })
        await user.save()
        
        res.status(200).send({ username })
    } catch (error) {
        if (!handleMongoError(error)) {
            console.log(error)
            res.status(400).send('Bad request')
        }
    }
})

module.exports = router