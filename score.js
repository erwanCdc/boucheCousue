// Imports
const express = require('express')
const os = require('os')
const bodyParser = require('body-parser')

// Port
const port = process.env.PORT || 3001
const host = 'localhost:3001'

// App
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
		next()
})

// Score database management variables & functions
var score
var username
var password
app.get('/get_score', (req, res) => {
	// Retrieves user id
	//user = req.body.id

	// Get score from
	console.log('Score: ', score)
	
	result = {score:score}
	console.log(result)

	result = JSON.stringify(result)
	console.log(result)

	res.send(result)
})

// Listening
app.listen(port, () => {
	console.log('Application running on ' + os.hostname() + " port : " + port)
})
