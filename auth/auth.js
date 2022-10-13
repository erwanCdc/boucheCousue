// Imports
const express = require('express')
const os = require('os')
const bodyParser = require('body-parser')
const http = require('http')
const fs = require("fs")

// Port
const port = process.env.PORT || 2999
const host = 'localhost:'+port

//Database
const db_path = './users.json'

// App
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
		next()
})


var username
var password

//APIs CONCERNING USERS ACCESS


    app.get('/is_logged', (req,res) => {

        var val
        if (username != null){
            val = 'true'
        }
        else{
            val = 'false'
        }
        result = {
            val:val
        }
        res.send(JSON.stringify(result))

    })

    app.get('/user_info', (req,res) => {

        result = {
            username:username
        }

        res.end(JSON.stringify(result))
    })

	//this api update {username/password} and define the "session"
	app.post('/log_user', (req,res) => {
		username = req.body.username
		password = req.body.password
		console.log("user authenticate : " + username)

        http.get('http://main_service:3000/game', (page) => {
             
            var bodyChunks = [];
            page.on('data', function(chunk) {
                
                bodyChunks.push(chunk);
            }).on('end', function() {
                var body = Buffer.concat(bodyChunks);
                res.send(body)
                
            })
            
        })
		
	})


	app.post('/register_user', (req,res) => {
		username = req.body.username
		password = req.body.password
		
        const users_db = require(db_path)

        var verifu = false
    
    
        //check if username already exists
        users_db.forEach(element => {
            if (element.user == user){
                verifu = true
            }
    
        })
    
    
        if (verifu){
    
            console.log("On t'a volé ton nom d'utilisateur... Ou tu as déjà un compte débilos")
    
        } 
        else {
    
            let new_user = {
                user: user,
                password: password
            }
    
            users_db.push(new_user)
    
    
            fs.writeFile(db_path, JSON.stringify(users_db), err => {
                if (err){
                    throw err
                } 
                else{

                    console.log("Utilisateur ajouté, va faire mumuse")

                    http.get('http://main_service:3000/game', (page) => {
             
                        var bodyChunks = [];
                        page.on('data', function(chunk) {
                            
                            bodyChunks.push(chunk);
                        }).on('end', function() {
                            var body = Buffer.concat(bodyChunks);
                            res.send(body)
                            
                        })
                        
                    })
                }
                
            })
    
        }
        
		
	})

	//this api delete {username/password} and abort the "session"
	app.get('/logout', (req, res) =>{
		console.log("user disconnected : " + username)
		username = null
		password = null
		
        http.get('http://main_service:3000/login', (page) => {
             
            var bodyChunks = [];
            page.on('data', function(chunk) {
                
                bodyChunks.push(chunk);
            }).on('end', function() {
                var body = Buffer.concat(bodyChunks);
                res.send(body)
                
            })
            
        })
	})

// Listening
app.listen(port, () => {
	console.log('Application running on ' + os.hostname() + " port : " + port)
})
