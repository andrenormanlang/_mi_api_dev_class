import express from "express"
import prisma from "./prisma" // importing the prisma instance we created
import morgan from "morgan"

const app = express()

app.use(morgan('dev'))
app.use(express.json())
/**
 * GET /
 */
app.get('/users', async (req, res) => { // /users is called an endpoint
	//await.prisma
	try{
		const users = await prisma.users.findMany()
		res.send(users)
	} catch (err){
		console.error(err)
		res.status(500).send({
			error: 'Failed to retrieve users, something went wrong querying the database.'
		})
	}
})

//GET a single user
app.get('/users/:userId', async (req, res) => {
	// need to do a catch for if no user / if no phone bla bla   
	const userId = Number(req.params.userId)
	try{

		// const { id } = req.params
		const user = await prisma.users.findUniqueOrThrow({ //findUniqueOrThrow in order to catch the error!
			where: {
				//id: Number(id) //console.log(req.params) => res.send() The id is a string
				id: userId,
			},
			include: {
				phones: true
			}

		})
/* 		if (!user){
			res.status(404).sen({
				message: "User no found"
			})
			return
		} */
		res.send(user)
	}catch (err){
	 	console.error(err)
	 	res.status(404).send({
		error: "Not found."
	 	})
	}

})

//POST / user
//Create a user
app.post('/users', async (req, res) => {
	//const { id, name } = req.body
	try{
		/* {data: {
			id,
			name
		}, */
		const user = await prisma.users.create({
			data: req.body,
		})
		res.status(201).send(user)
	} catch (err){
		console.error(err)
		res.status(500).send({
			error: "Something went wrong creating the record in the database."
		})
	}
})


app.get('/phones', async (req, res) => {
	//await.prisma
	try{
		const phones = await prisma.phones.findMany()
		res.send(phones)
	} catch (err){
		console.log(err)
		res.status(500).send({
			error: 'Failed to retrieve phones, something went wrong querying the database.'
		})
	}
})


app.get('/phones/:phoneId', async (req, res) => {
	// need to do a catch for if no user / if no phone bla bla   
	const phoneId = Number(req.params.phoneId)
	//const { id } = req.params
	try{const phone = await prisma.phones.findUniqueOrThrow({
		where: {
			id: phoneId,
		},
		include: {
			user:true, //Change from users to user in singular
			//in the schema and npx generate prisma afterwards
		}
		})
		res.send(phone)
	}catch (err){
		console.error(err)
		res.status(404).send({
			error: "Not found."
		})
	}
})

//POST / phone
//Create a phone
app.post('/phones', async (req, res) => {

	try{
		const phone = await prisma.phones.create({
			data: req.body,
		})
		res.status(201).send(phone)
	} catch (err){
		console.error(err)
		res.status(500).send({
			error: "Something went wrong creating the record in the database."
		})
	}
})

export default app
