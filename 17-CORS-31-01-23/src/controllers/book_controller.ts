/**
 * Publisher Controller
 */
import Debug from 'debug'
import {Request, Response} from 'express'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-books:book_controller')

/* Get all books */
export const index = async (req: Request, res: Response) =>{
	try{
		const books = await prisma.book.findMany()
		res.send({
			status:"success",
			data: books,
		})
	} catch (err){
		res.status(500).send({status: "error" ,message: "Something went wrong"})
	}
}

/* Get a single book */
export const show = async (req: Request, res: Response) => {
	const bookId = Number(req.params.bookId)
	try{
		const book = await prisma.book.findUniqueOrThrow({
			where: {
				id: bookId,
			},
			include: {
				authors: true,
				publisher: true
			}

		})
		res.send({
			status:"success",
			data: book,
		})
	}catch (err){
		debug("Error thrown when finding book with id %o: %o", req.params.bookId, err)
	 	res.status(404).send({ status: "error",
		error: "Not found."
	 	})
	}

}

/* Create a book */
export const store =  async (req: Request, res: Response)=>{
	try {
		const book = await prisma.book.create({
			data: {
				title: req.body.title,
				pages: req.body.pages,
				isbn: req.body.isbn,
				publisherId: req.body.publisherId,
				cover: req.body.cover,
			}
		})
		res.send(book)
	} catch (err) {
		res.status(500).send({ message: "Something went wrong" })
	}
}

/* Update a single book */
export const update = async (req: Request, res: Response) => {
	const bookId = Number(req.params.bookId)
	try{
		const book = await prisma.book.update({
		where: {
				id: bookId,
		},
		data: req.body})
		return res.send(book)
	}catch (err){
	 	console.error(err)
	 	res.status(404).send({
		error: "Not found."
	 	})
	}
}

/* Delete a book */
export const destroy =  async (req: Request, res: Response)=>{
	const bookId = Number(req.params.bookId)
	try{
		const book = await prisma.author.delete({
			where: {
				id: bookId,
			}
		})
		res.send(book)
	}catch (err){
	 	console.error(err)
	 	res.status(404).send({
		error: "Not found."
	 	})
	}
}
