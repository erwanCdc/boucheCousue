// IMPORTS
const express = require('express')
const os = require('os')
const bodyParser = require('body-parser')
const http = require('http')
const fs = require("fs")

// PORT
const port = process.env.PORT || 2999
const host = 'localhost:'+port

// DATABASE
const db_path = './users.json'

// APP
const mainPath = (__dirname+'/www')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())
app.use(express.static(mainPath))
app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*")
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
		next()
})



//APIs RETRIEVING HTML STATIC BRICKS

    /**
     * this api send the HTML brick concerning the login
     */
	app.get('/login', (req, res) =>{
		res.sendFile(mainPath+'/html/login.html')
	})

    /**
     * this api send the HTML brick concerning the registration
     */
	app.get('/register', (req, res) =>{
		res.sendFile(mainPath+'/html/register.html')
	})



//APIs CONCERNING USERS ACCESS

    /**
     * this api send a JSON object containing the username
     */
    app.get('/user_info', (req,res) => {

        result = {
            username:username
        }

        res.end(JSON.stringify(result))
    })

    /**
     * this api check if a session is open client side and send a JSON object with the answer 
     * (true if session is open, false else)
     */
    app.post('/is_logged', (req,res) => {
        username = req.body.username

        var val
        if ((username != null)&&(username != undefined)&&(username != "")){
            console.log("user is connected : " + username)
            val = 'true'
        }
        else{
            console.log("user isnt connected")
            val = 'false'
        }
        result = {
            val:val
        }
        res.send(JSON.stringify(result))
    })

    /**
     * this api try to authenticate a user with login infos (usrname/pwd)
     * if authentication success, a session is opened client-side
     */
	app.post('/log_user', (req,res) => {
		const users_db = require(db_path)
        username = req.body.username
        password = req.body.password
        var verifu = false
        var verifp = false

        users_db.forEach(element => {
            if (element.user == username){
                verifu = true
                if (element.password == password) {
                    verifp = true
                }
            }
        })

        if (verifu && verifp){
            console.log("user authenticated : " + username)
            res.send(true)
        }
        else {
            if (verifu && !verifp){
                console.log("wrong password for user : " + username)
            } 
            else {
            }
        }
	})

    /**
     * this api try to create a user with register infos (usrname/pwd)
     * if the username isn't already used, the user is added to the database
     * then a session is opened client-side
     */
	app.post('/register_user', (req,res) => {
		username = req.body.username
		password = req.body.password
        const users_db = require(db_path)
        var verifu = false
    
        //check if username already exists in db
        users_db.forEach(element => {
            if (element.user == username){
                verifu = true
            }
        })
    
        if (verifu){
        } 
        else {
            let new_user = {
                user: username,
                password: password
            }
            users_db.push(new_user)
            users_db.forEach(element => {
                console.log(element.user)
            })
    
            fs.writeFile(db_path, JSON.stringify(users_db), err => {
                if (err){
                    throw err
                } 
                else{
                    console.log("user created : " + username)
                    res.send(true)
                }
            })
        }
	})

    /**
     * this api send the login page after closing the session client-side
     */
	app.post('/logout', (req, res) =>{
        username = req.body.username
		console.log("user disconnected : " + username)
        res.sendFile(mainPath+"/html/login.html")
	})



//APIs NETWORK

    /**
     * this api print this server's port
     */
    app.listen(port, () => {
        console.log('Application running on ' + os.hostname() + " port : " + port)
    })
