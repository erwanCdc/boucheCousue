const express = require('express')

const seedrandom = require('seedrandom')
const bodyParser = require("body-parser")
const path = require('path')

const os = require('os')
const fs = require('fs')


const app = express()


const port = process.env.PORT || 3000
const host = 'localhost:3000'

const mainPath = (__dirname+'/www')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(express.static(mainPath))


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

var score = 0
var username
var password

app.get('/', (req,res) => {
	
})

app.get('/game', (req,res) => {
	res.sendFile(mainPath+'/html/game.html')
})

app.get('/score', (req, res) => {
	res.sendFile(mainPath+'/html/score.html')
})

app.post('/score', (req, res) => {
	score = req.body.score
	console.log("score update : " + score)
})

app.get('/login', (req, res) =>{
	res.sendFile(mainPath+'/html/login.html')
})

app.get('/logout', (req, res) =>{
	username = null
	password = null
	score = null
	res.sendFile(mainPath+'/html/login.html')
})

app.get('/header', (req,res) => {
	res.sendFile(mainPath+'/html/header.html')
})

app.post('/log_user', (req,res) => {
	username = req.body.username
	password = req.body.password
	score = 0
	console.log("user authenticate : " + username)
	res.sendFile(mainPath+'/html/game.html')
})

app.get('/user', (req, res) => {
	response = {  
		username:username,
		score:score
	}
	console.log(response)
	res.end(JSON.stringify(response));  
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
	console.log('Application running on ' + os.hostname() + " port : " + port)
})
