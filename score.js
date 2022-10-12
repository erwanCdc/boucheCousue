const express = require('express')
const os = require('os')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3001
const host = 'localhost:3001'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text())
var score = 0
var username
var password
app.use((req, res, next) => {
	              res.header("Access-Control-Allow-Origin", "*");
	              res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	              next();
	  })

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


app.listen(port, () => {
	console.log('Application running on ' + os.hostname() + " port : " + port)
})
