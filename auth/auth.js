// Imports
const express = require('express')
const os = require('os')
const bodyParser = require('body-parser')
const http = require('http')

// Port
const port = process.env.PORT || 2999
const host = 'localhost:'+port

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
