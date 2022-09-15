const express = require('express')
const fs = require('fs')

const app = express()
const port = 3000

app.get('/', (req, res) => {
	// Read & store words into an array
	var words = fs.readFileSync('./data/liste_francais_utf8.txt').toString().split("\r\n");
	console.log('List Initialized')

	// Seed generator
	const seedrandom = require('seedrandom');
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();
	const daySeed = day*3 + month*2 + year;
	const generator = seedrandom(daySeed);
	const randomNumber = Math.floor(generator() * words.length);
	console.log('Word generated : ' + words[randomNumber]);
	
	// HTML
	fs.readFile('./html/game.html',null,(error,data)=>{
		if(error){
			res.end('fill have error')
		} else{
			res.end(data)
		}
	});
});

app.listen(port, () => {
	console.log(`Application running on port ${port}`)
})
