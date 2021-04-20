const path = require('path')
const express = require('express')

// Create Express app
const app = express()

// Determine port (defaulting to 5000)
const port = process.env.PORT || 5000

// Configure static middleware to serve from the "./interactive-report/build" directory
const absolutePath = path.join(__dirname, '..', 'interactive-report', 'build')
app.use(express.static(absolutePath))

// Start the server
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
}) 
