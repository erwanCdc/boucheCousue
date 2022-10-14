// Imports
const express = require('express')
const os = require('os')
const bodyParser = require('body-parser')
const fs = require("fs")
const http = require('http')

// Port
const port = process.env.PORT || 3001
const host = 'localhost:3001'

// Database
const db_path = './scores.json'

const mainPath = (__dirname+'/www')

// App
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(express.static(mainPath))
app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
		next()
})

// Score database management variables & functions
var score


function update_db(user, attribute, value){

    const scores_db = require(db_path)

    scores_db.forEach(element => {

        if (element.user == user){

            element[attribute] = element[attribute] + value

        }
    })
    fs.writeFile(db_path, JSON.stringify(scores_db), err => {
        if (err){
			throw err
		} 
		else{
			console.log("La valeur de l'attribut " + attribute + " pour l'utilisateur " + user + " e été mise à jour")
		}
        
    })
}




app.post('/update_score', (req,res) => {

	var user = req.body.user

	const scores_db = require(db_path)
	scores_db.forEach(element => {
		if (element.user == user){
			user_json = element
		}
	})
	console.log(user_json)
	
	update_db(user,'number_victories', parseInt(req.body.win))
	update_db(user, 'number_games', 1)
	update_db(user, 'cumulated_score', parseInt(req.body.nb_try))
	update_db(user, 'played', 1)

	scores_db.forEach(element => {
		if (element.user == user){
			user_json = element
		}
	})

	console.log(user_json)

})


app.post('/already_played', (req,res) => {

	const scores_db = require(db_path)

	let user = req.body.username
	var user_json

	scores_db.forEach(element => {
		if (element.user == user){
			user_json = element
		}
	})

	if ((user_json != null)&&(user_json != undefined)){
		if (user_json.played == 1){
			res.send(true)
		}
		else {
			res.send(false)
		}
	}
	else{
		res.send(false)
	}


})


app.post('/get_score', (req, res) => {

	const scores_db = require(db_path)

	let user = req.body.username
	var user_json

	scores_db.forEach(element => {
		if (element.user == user){
			user_json = element
		}
	})

	let val_avg
	let val_win_prct

	if (user_json.number_victories != 0){
		val_avg = Math.round(user_json.cumulated_score/user_json.number_victories*10)/10
	}
	else {
		val_avg = 0
	}

	if (user_json.number_games != 0){
		val_win_prct = Math.round(user_json.number_victories/user_json.number_games*100)
	}
	else{
		val_win_prct = 0
	}

	result = {
		score: val_avg,
		win_prct: val_win_prct,
		nb_games: user_json.number_games
	}

	res.send(JSON.stringify(result))


})


app.post('/init_user', (req,res) => {


	const scores_db = require(db_path)
	var verifu = false
	var user = req.body.username


	scores_db.forEach(element => {
		if (element.user == user){
			verifu = true
		}
	})


	if (!verifu){

		let new_user = {
			user: user,
			number_games: 0,
			number_victories: 0,
			cumulated_score: 0,
			played: 0
		}



		scores_db.push(new_user)



		fs.writeFile(db_path, JSON.stringify(scores_db), err => {

			if (err) {
				throw err
			}
			else{
				console.log("user " + user + " initialized")

				scores_db.forEach((elm) => {
					console.log(elm.user)
				})
				

			}
		})

	}

})


//this api send the HTML brick concerning the player's data
app.get('/score', (req, res) => {
	res.sendFile(mainPath+'/html/score.html')
})

// Listening
app.listen(port, () => {
	console.log('Application running on ' + os.hostname() + " port : " + port)
})
