/**
 * Publisher Controller
 */
import {Request, Response} from 'express'
import prisma from '../prisma'

/* Get all books */
export const index = async (req: Request, res: Response) =>{
	try{
		const publishers = await prisma.book.findMany({
			include:{
				authors: true,
				publisher: true
			}
		})
		res.send(publishers)
	} catch (err){
		res.status(500).send({message: "Something went wrong"})
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
		res.send(book)
	}catch (err){
	 	console.error(err)
	 	res.status(404).send({
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
