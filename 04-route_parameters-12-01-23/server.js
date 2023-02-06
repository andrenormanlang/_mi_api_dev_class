/**
 * Express Server
 */

// Require stuff
const express = require('express')
const _ = require('lodash')
const fs = require('fs/promises')
const morgan = require('morgan')
const oneliners = require('./data/oneliners.json')
const users = require('./data/users.json')
const PORT = 3000

// Create a new Express app
const app = express()

// Parse any incoming JSON
app.use(express.json())

// Log information about all incoming requests using morgan
app.use(morgan('dev'))

// GET /
app.get('/', (req, res) => {
	// res.send("Oh, hi there ☺️")
	res.send({
		message: "Oh, hi there ☺️",
		lolcats: "Are funny",
		reactions_on_isaks_memes: [
			"rotflol",
			"yolo"
		],
	})
})

// POST /
app.post('/', (req, res) => {
	res.send("I'm no mailbox 😡")
})

// GET /coffee
app.get('/coffee', (req, res) => {
	res.send("Is good for you!")
})

// GET /joke
app.get('/joke', (req, res) => {
	// Get a random item from the array `oneliners`
	const joke = _.sample(oneliners)

	// Respond with a object containing the oneliner in the `joke` attribute
	res.send({
		joke,	// joke: joke
	})
})

// GET /badjoke (using filesystem and a textfile)
app.get('/badjoke', async (req, res) => {
	try {
		const rawFile = await fs.readFile('./data/oneliners.txt', 'utf-8')
		const jokes = rawFile.split('\n')

		// Get a random item from the array `oneliners`
		const joke = _.sample(jokes)

		// Respond with a object containing the oneliner in the `joke` attribute
		res.send({
			joke,	// joke: joke
		})

	} catch (e) {
		console.log("ERROR! ERROR! DANGER WILL ROBINSON!")
	}
})

/* GET/users
/  List all users */
app.get('/users',(req,res)=>{
	console.log('query-string:', req.query);

	res.send(users)
})

/* POST /users */
/* Create a new user */
app.post('users',(req,res) =>{
	console.log('Create user')
	console.log('Body?',req.body);

	res.send({})
})

/* GET /users/:userId */

/* Get the user with the id of userId */
app.get('/users/:userId',(req,res)=>{
	console.log("Params:", req.params)
	const userId = Number(req.params.userId)

	const user = users.find(user =>  user.id === userId)

	res.send(user)

});

/* app.get('/users/1',(req,res) =>{})
app.get('/users/2',(req,res) =>{})
app.get('/users/3',(req,res) =>{}) */

// Catch requests where a route does not exist
app.use((req, res) => {
	res.status(404).send({
		message: `Sorry, no route exists for ${req.method} ${req.path}`,
	})
})

// Start listening for incoming requests on port 3000
app.listen(PORT, () => {
	console.log(`🥳 Yay, server started on localhost:${PORT}`)
})
