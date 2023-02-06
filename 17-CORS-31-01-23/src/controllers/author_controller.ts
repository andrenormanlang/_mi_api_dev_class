/**
 * Author Controller
 */
import Debug from 'debug'
import {Request, Response} from 'express'
import { validationResult } from 'express-validator'
import prisma from '../prisma'

// Create a new debug instance
const debug = Debug('prisma-books:author_controller')

/* Get all authors */
export const index = async (req: Request, res: Response) => {
	try {
		const books = await prisma.book.findMany()

		res.send({
			status: "success",
			data: books,
		})

	} catch (err) {
		debug("Error thrown when finding books", err)
		res.status(500).send({ status: "error", message: "Something went wrong" })
	}
}

/* Get a single author */
export const show = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId)
	try{
		const author = await prisma.author.findUniqueOrThrow({
			where: {
				id: authorId,
			}
		})
		res.send(author)
	}catch (err){
	 	console.error(err)
	 	res.status(404).send({
		error: "Not found."
	 	})
	}

}

/* Create a author */
export const store =  async (req: Request, res: Response)=>{
/* 	const birthdate = (new Date(req.body.birthdate)).toISOString() */
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()){
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		})
	}
	try {
		const author = await prisma.author.create({
			data: {
				name: req.body.name,
				/* birthdate: birthdate, */
			}
		})
		res.status(201).send(author)
	} catch(err){
		res.status(500).send({message:"Something went wrong"})
	}
}

/* Patch a author */
export const update =  async (req: Request, res: Response)=>{
	const authorId = Number(req.params.authorId)

	try {
		const author = await prisma.author.update({
			where: {
				id: authorId,
			},
			data: req.body,
		})

		return res.send(author)

	} catch (err) {
		return res.status(500).send({ message: "Something went wrong" })
	}
}

/* Connect author to a book */
/**
 * POST /authors/:authorId/books
 */
export const connectBook = async (req: Request, res: Response) => {
	try {
		const result = await prisma.author.update({
			where: {
				id: Number(req.params.authorId),
			},
			data: {
				books: {
					connect: {
						id: req.body.bookId,
					}
				}
			},
			include: {
				books: true,
			}
		})
		res.status(201).send(result)
	} catch (err) {
		debug("Error thrown when adding book %o to a author %o: %o", req.body.bookId, req.params.authorId, err)
		res.status(500).send({ message: "Something went wrong" })
	}
}


/* Delete a author */
export const destroy =  async (req: Request, res: Response)=>{
	const authorId = Number(req.params.authorId)
	try{
		const author = await prisma.author.delete({
			where: {
				id: authorId,
			}
		})
		res.send(author)
	}catch (err){
	 	console.error(err)
	 	res.status(404).send({
		error: "Not found."
	 	})
	}
}
