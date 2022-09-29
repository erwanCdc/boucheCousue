const express = require('express')

const seedrandom = require('seedrandom')
const bodyParser = require("body-parser")
const path = require('path')

const os = require('os')
const fs = require('fs')


const app = express()

const port = process.env.PORT || 3000
const host = 'localhost:3000'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'www')))

// Read & store words into an array
var words = fs.readFileSync('./www/data/liste_francais_utf8.txt').toString().split("\r\n")
console.log('List Initialized')

// Seed generator
var today = new Date()
var day = today.getDate()
var month = today.getMonth()+1
var year = today.getFullYear()
const daySeed = day*3 + month*2 + year
const generator = seedrandom(daySeed)
const randomNumber = Math.floor(generator() * words.length)
currentWord = words[randomNumber]
console.log('Word generated : ' + words[randomNumber])

app.get('/', (req,res) => {
	
})

app.post('/', (req, res) => {

	console.log(req.body)
})

app.get('/get_mot', (req, res) => {  
	response = {  
		   word:currentWord
	   }
	   res.end(JSON.stringify(response));  
	})  

app.get('/port', (req,res) => {
	res.send("MOTUS is listening on " + os.hostname() + " port:  " + port)
})

app.listen(port, () => {
	console.log(`Application running on port ${port}`)
})
