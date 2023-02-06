import express from "express"
import prisma from "./prisma" // importing the prisma instance we created
import morgan from "morgan"

const app = express()

app.use(morgan('dev'))

/**
 * GET /
 */
app.get('/users', async (req, res) => {
	//await.prisma
	try{
	const users = await prisma.users.findMany()
	res.json(users)
	} catch (err){
		console.error(err)
		res.status(500).json({
			error: 'Failed to retrieve users'
		})
	}
})

app.get('/phones', async (req, res) => {
	//await.prisma
	try{
	const phones = await prisma.phones.findMany()
	res.json(phones)
	} catch (err){
		console.log(err)
		res.status(500).json({
			error: 'Failed to retrieve phones'
		})
	}
})

app.get('/users/:id', async (req, res) => {
	// need to do a catch for if no user / if no phone bla bla   
	try{
		const { id } = req.params
		const user = await prisma.users.findUnique({
		where: {
			id: Number(id)
		}, include: {
			phones: true
			}
		})
		res.json(user)
	}catch (err){
	 	console.error(err)
	 	res.status(500).json({
		error: "No user with that id in the DB"
	 	})
	}

})

app.get('/phones/:id', async (req, res) => {
	// need to do a catch for if no user / if no phone bla bla   
	const { id } = req.params
	try{const phone = await prisma.phones.findUnique({
		where: {
			id: Number(id)
		}, include: {
			users:true
			}
		})
		res.json(phone)
	}catch (err){
		console.error(err)
		res.status(500).json({error: 'This id doesn´t exist'})
	}
})

app.post('/users', async (req, res) => {
	const { id, name } = req.body
	const postUser = await prisma.users.create(
		{data: {
			id,
			name
		},
	})
	res.status(201).json(postUser)
})

app.post('/phones', async (req, res) => {
	const { id, manufacturer, model, imei, user_id } = req.body
	const postPhone = await prisma.phones.create({
		data: {
			id,
			manufacturer,
			model,
			imei,
			user_id
			},
		})
	res.status(201).json(postPhone)
})

export default app
