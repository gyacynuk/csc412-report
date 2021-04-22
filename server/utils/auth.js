const { User } = require('../db/models/user')

// Middleware for authentication of resources
const authenticate = (req, res, next) => {
    const userId = req.session.user
    if (userId) {
        User.findById(userId).then(user => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch(() => {
            res.status(401).send("Unauthenticated")
        })
    } else {
        res.status(401).send("Expired Session")
    }
}

// Middleware for authentication of resources
const adminOnly = (req, res, next) => {
    if (req?.user?.isAdmin) {
        next()
    }
    else {
        res.status(403).send("Forbidden")
    }
}

module.exports = {
    authenticate,
    adminOnly,
}