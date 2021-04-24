const express = require('express')
const router = express.Router()
const log = console.log

// Middleware and Helpers
const { handleMongoError } = require('../utils/mongo')

// Mongo and Mongoose
const { User } = require('../db/models/user')
const { Survey } = require('../db/models/survey')

router.get('/chart', async (req, res) => {
    try {
        const generatedInvitesQuery = await User.aggregate([
            {
                $match: {
                    'isAdmin': false,
                }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                }
            }
        ])
        const generatedInvites = generatedInvitesQuery?.[0]?.count || 0

        const completedSurveysQuery = await Survey.aggregate([
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                }
            }
        ])
        const completedSurveys = completedSurveysQuery?.[0]?.count || 0

        const trackResultsQuery = await Survey.aggregate([
            { $unwind: '$responses' },
            {
                $group: {
                    _id: '$responses.track',
                    correct: { 
                        $sum: {
                            $cond: [
                                { $eq: [ '$responses.isCorrect', true ] }, 
                                1, 
                                0
                            ]
                        }
                    },
                    total: { $sum: 1  }
                }
            },
            { $sort: { _id: 1 } }
        ])
        const trackResults = Object.fromEntries(trackResultsQuery.map(item => [ item._id, item ]))

        const totalResultsQuery = await Survey.aggregate([
            { $unwind: '$responses' },
            {
                $group: {
                    _id: '$responses.source',
                    correct: { 
                        $sum: {
                            $cond: [
                                { $eq: [ '$responses.isCorrect', true ] }, 
                                1, 
                                0
                            ]
                        }
                    },
                    total: { $sum: 1  }
                }
            },
            { $sort: { _id: 1 } }
        ])
        const totalResults = Object.fromEntries(totalResultsQuery.map(item => [ item._id, item ]))

        res.json({ generatedInvites, completedSurveys, trackResults, totalResults })
    } catch (error) {
        if (!handleMongoError(error)) {
            log(error)
            res.status(500).send('Internal Server Error')
        }
    }
})

module.exports = router