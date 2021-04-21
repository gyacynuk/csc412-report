const path = require('path')
const express = require('express')

// Create Express app
const app = express()

// Determine port (defaulting to 5000)
const port = process.env.PORT || 5000

// Configure static middleware to serve from the "./interactive-report/build" directory
const absolutePath = path.join(__dirname, '..', 'interactive-report', 'build')


// Static routes of webpages
app.use(express.static(absolutePath))
// Route error handling (such as 404s) is built in to the front-end, so serve the React app for any page requested
app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, path.join(absolutePath, 'index.html')))
})

// Start the server
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
}) 
