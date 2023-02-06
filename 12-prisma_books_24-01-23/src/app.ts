import express from "express"
import prisma from "./prisma" // importing the prisma instance we created
import morgan from "morgan"
import { error } from "console"

const app = express()
app.use(express.json())
app.use(morgan('dev'))

/**
 * GET /
 */
app.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

/**
 * GET /authors
 */
app.get('/authors', async (req,res) =>{
	try{
		const authors = await prisma.author.findMany({
			include:{
				books: true,
			}
		})
		res.send(authors)
	} catch (err){
		res.status(500).send({message: "Something went wrong"})
	}
})

/**
* POST / Authors
*/
app.post('/authors', async (req,res)=>{
	try{
		const author = await prisma.author.create({
			data:{
				name: req.body.name, // req.body.name insted of only data:{req.body}
				//It avoids the hacking of the postman
				birthdate: req.body.birthdate,
			}
		})
		res.status(201).send(author)
	} catch(err){
		res.status(500).send({message:"Something went wrong"})
	}
})

// GET /authors/:authorId
// Also get the author's books
app.get('/authors/:authorId', async (req, res) => {
	// need to do a catch for if no user / if no phone bla bla   
	const authorId = Number(req.params.authorId)
	try{

		// const { id } = req.params
		const publisher = await prisma.author.findUniqueOrThrow({ //findUniqueOrThrow in order to catch the error!
			where: {
				//id: Number(id) //console.log(req.params) => res.send() The id is a string
				id: authorId,
			},
			include: {
				books: true
			}

		})
/* 		if (!user){
			res.status(404).sen({
				message: "User no found"
			})
			return
		} */
		res.send(publisher)
	}catch (err){
	 	console.error(err)
	 	res.status(404).send({
		error: "Not found."
	 	})
	}

})

/**
 * POST /authors/:authorId/books
 */
app.post('/authors/:authorId/books', async (req,res)=>{
	try {
		const result = await prisma.author.update({
			where:{
				id: Number(req.params.authorId),
			},
			data:{
				books:{
					connect:{
						id:req.body.bookId,
					}
				}
			},
			include:{
				books: true,
			}
		})
		res.send(result)
	} catch(err) {
		res.status(500).send({message:"Something went wrong"})
	}
})


app.delete('/authors/:authorId/books', async (req,res)=>{
	try {
		const result = await prisma.author.update({
			where:{
				id: Number(req.params.authorId),
			},
			data:{
				books:{
					disconnect:{
						id:Number(req.body.bookId),
					}
				}
			},
			include:{
				books: true,
			}
		})
		res.send(result)
	} catch(err) {
		res.status(500).send({message:"Something went wrong"})
	}
})

/**
 * POST /books/:bookId/authors
 */
app.post('/books/:bookId/authors', async (req, res) => {
	try {
		const result = await prisma.book.update({
			where: {
				id: Number(req.params.bookId),
			},
			data: {
				authors: {
					connect: {
						id: req.body.authorId,
					}
				}
			},
			include: {
				authors: true,
			}
		})
		res.status(201).send(result)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
})

/**
* GET/ Books
*/
app.get('/books', async (req,res) =>{
	try{
		const books = await prisma.book.findMany()
		res.send(books)
	} catch (err){
		res.status(500).send({message: "Something went wrong"})
	}
})



app.post('/books', async (req, res) => {
	try {
		const book = await prisma.book.create({
			data: {
				title: req.body.title,
				pages: req.body.pages,
				isbn: req.body.isbn,
				publisherId: req.body.publisherId,
			}
		})
		res.send(book)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
})


// GET /books/:bookId
// Also get the book's author and the book's publisher
app.get('/books/:bookId', async (req, res) => {
	// need to do a catch for if no user / if no phone bla bla   
	const bookId = Number(req.params.bookId)
	try{

		// const { id } = req.params
		const book = await prisma.book.findUniqueOrThrow({ //findUniqueOrThrow in order to catch the error!
			where: {
				//id: Number(id) //console.log(req.params) => res.send() The id is a string
				id: bookId,
			},
			include: {
				authors: true,
				publisher: true
			}

		})
/* 		if (!user){
			res.status(404).sen({
				message: "User no found"
			})
			return
		} */
		res.send(book)
	}catch (err){
	 	console.error(err)
	 	res.status(404).send({
		error: "Not found."
	 	})
	}

})


app.post('/books/:bookId/publisher', async (req,res)=>{
	try {
		const result = await prisma.book.update({
			where:{
				id: Number(req.params.bookId),

			},
			data:{
				publisher:{
					connect:{
						id:req.body.publisherId,
					}
				}
			},
			include:{
				publisher: true,
			}
		})
		res.send(result)
	} catch(err) {
		res.status(500).send({message:"Something went wrong"})
	}
})


// GET /publishers
// Get all publishers (but not their published books)
app.get('/publishers', async (req,res) =>{
	try{
		const publishers = await prisma.publisher.findMany({
			include:{
				books: true,
			}
		})
		res.send(publishers)
	} catch (err){
		res.status(500).send({message: "Something went wrong"})
	}
})

// GET /publishers/:publisherId
// Also get the publisher's published books
app.get('/publishers/:publisherId', async (req, res) => {
	// need to do a catch for if no publisher / if no publisher bla bla   
	const publisherId = Number(req.params.publisherId)
	try{

		// const { id } = req.params
		const publisher = await prisma.publisher.findUniqueOrThrow({ //findUniqueOrThrow in order to catch the error!
			where: {
				//id: Number(id) //console.log(req.params) => res.send() The id is a string
				id: publisherId,
			},
			include: {
				books: true
			}

		})
/* 		if (!user){
			res.status(404).sen({
				message: "User no found"
			})
			return
		} */
		res.send(publisher)
	}catch (err){
	 	console.error(err)
	 	res.status(404).send({
		error: "Not found."
	 	})
	}

})

// POST /publishers
// Create a publisher
app.post('/publishers', async (req,res)=>{
	try{
		const publisher = await prisma.publisher.create({
			data:{
				name: req.body.name, // req.body.name insted of only data:{req.body}
				//It avoids the hacking of the postman
			}
		})
		res.status(201).send(publisher)
	} catch(err){
		res.status(500).send({message:"Something went wrong"});
		console.log(error);
	}
})


export default app
