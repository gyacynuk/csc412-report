const express = require('express')
const session = require('express-session')
const cors = require('cors')
const path = require('path')
const MongoStore = require('connect-mongo')

// Load .env file
require('dotenv').config()
const PROD = process.env.ENV === 'PROD'
const PORT = process.env.PORT || 5000

// Middleware
const { authenticate, adminOnly } = require('./utils/auth')
const { mongoConnectionCheck } = require('./utils/mongo')

// Routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const statsRoutes = require('./routes/stats')

// Create Express app
const app = express()

// Configure parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Allow CORS if not prod
if (PROD) {
    app.use(cors({
        credentials: true,
        origin: ['https://nice-music-synthesis.herokuapp.com', 'https//nice-music-synthesis.herokuapp.com']
    }))
    // Enabling CORS Pre-Flight
    app.options('*', cors())
} else {
    app.use(cors({
        credentials: true,
        origin: 'http://localhost:3000'
    }))
}

// Configure session middleware
const COOKIE_LIFETIME_MILLIS = parseInt(process.env.COOKIE_LIFETIME_MILLIS) || 10 * 60 * 1000
app.use(session({
    secret: process.env.SESSION_SECRET || 'dev secret',
    cookie: {
        expires: COOKIE_LIFETIME_MILLIS,
        httpOnly: true,
    },
    // Session saving options
    saveUninitialized: false,
    resave: false,
    // Store options
    store: PROD ? MongoStore.create({ mongoUrl: process.env.MONGODB_URI }) : null
}));

// API routes
app.use('/api/auth', mongoConnectionCheck, authRoutes)
app.use('/api/user', mongoConnectionCheck, authenticate, adminOnly, userRoutes)
app.use('/api/stats', mongoConnectionCheck, authenticate, adminOnly, statsRoutes)

// Static routes of webpages
const absolutePath = path.join(__dirname, '..', 'interactive-report', 'build')
app.use(express.static(absolutePath))
app.get("*", (_, res) => {
    res.sendFile(path.join(absolutePath, 'index.html'))
})

// Start the server
app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`)
}) 
