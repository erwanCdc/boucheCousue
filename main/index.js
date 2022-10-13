const express = require('express')
const seedrandom = require('seedrandom')
const bodyParser = require("body-parser")
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

var score = null


//ALLOW CROSS REQUESTS
	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*')
		res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
		next()
	})


	app.get('/', (req,res) => {
		
	})

//APIs RETRIEVING STATIC HTML PAGES

	//this api send the HTML brick concerning the motus game
	app.get('/game', (req,res) => {
		res.sendFile(mainPath+'/html/game.html')
	})

	//this api send the HTML brick concerning the player's data
	app.get('/score', (req, res) => {
		res.sendFile(mainPath+'/html/score.html')
	})

	//this api send the HTML brick concerning the login
	app.get('/login', (req, res) =>{
		res.sendFile(mainPath+'/html/login.html')
	})

	//this api send the HTML brick concerning the registration
	app.get('/register', (req, res) =>{
		res.sendFile(mainPath+'/html/register.html')
	})

	//this api send the HTML brick used as header in our global HTML page
	app.get('/header', (req,res) => {
		res.sendFile(mainPath+'/html/header.html')
	})


//APIs RETRIEVING DATA FROM SERVER

	//this api send a JSON object containing the word of the day
	app.get('/get_mot', (req, res) => {  
		response = {  
			word:currentWord
		}
		console.log("today's word : " + JSON.stringify(response))
		res.end(JSON.stringify(response));  
	})  

	//this api send a boolean, true if the submited word exists in our dictionnary, false else.
	app.post('/test_word', (req, res) => {
		test = req.body.word
	
		if (words.includes(test)){
			console.log("user's input exists in dictionnary !")
			response = {
				test:'true'
			}
		}
		else{
			console.log("user's input doesn't exist in dictionnary !")
			response = {
				test:'false'
			}
		}
	
		res.end(JSON.stringify(response));  
	})




//APIs NETWORK

	//these apis send this server's port (get/listen)
	app.get('/port', (req,res) => {
		res.send("MOTUS is listening on " + os.hostname() + " port:  " + port)
	})

	app.listen(port, () => {
		console.log('Application running on ' + os.hostname() + " port : " + port)
	})
