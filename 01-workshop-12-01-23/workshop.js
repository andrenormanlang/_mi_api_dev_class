/**
 * Workshop
 * 1. create a server
 * 2. request data
 * 3. send data as a joke
 */

const express = require("express"); // need this to run Node express
const _ = require('lodash')
const fs = require('fs/promises')
/* const fs = fs.promises( ) for txt files*/ 
const PORT = 3000;

const app = express();


const jokes = require("./data/oneliners.json"); // we need the jokes data

/* Previous way of solving before lodash */
/* const oneJokeNumber = Math.floor(Math.random() * jokes.length);
const joke = jokes[oneJokeNumber]; */

// GET
app.get('/joke', (req, res) => {
  // send a response
  // response.send("what's up?")
  // html  text
/*   res.send({ joke });
  console.log(jokes); */

  /* const i =  random(0, oneliners.length - 1) */
  const joke = _.sample(jokes)

  res.send({ 
    joke,
  })
});

// GET /badjoke (using filesystem and a textfile)
app.get('/badjoke', async (req, res) => {
	try {
		const rawFile = await fs.readFile('./data/oneliners.txt', 'utf-8')
		const jokes = rawFile.split('\n')
		console.log('jokes:', jokes);
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





app.listen(PORT, () => {
  console.log(`the server started on localhost:${PORT}`);
});
