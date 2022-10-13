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

	scores_db.forEach(element => {
		if (element.user == user){
			user_json = element
		}
	})

	console.log(user_json)

	
	http.get('http://main_service:3000/score', (page) => {
             
		var bodyChunks = [];
		page.on('data', function(chunk) {
			
			bodyChunks.push(chunk);
		}).on('end', function() {
			var body = Buffer.concat(bodyChunks);
			res.send(body)
			
		})
	})

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

	let val
	if (user_json.number_victories != 0){
		val = Math.round(user_json.cumulated_score/user_json.number_victories*10)/10
	}
	else {
		val = 0
	}

	result = {
		score: val
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

// Listening
app.listen(port, () => {
	console.log('Application running on ' + os.hostname() + " port : " + port)
})
