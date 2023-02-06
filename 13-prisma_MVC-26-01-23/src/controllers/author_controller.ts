/**
 * Publisher Controller
 */
import {Request, Response} from 'express'
import prisma from '../prisma'

/* Get all authors */
export const index = async (req: Request, res: Response) =>{
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
}

/* Get a single author */
export const show = async (req: Request, res: Response) => {
	const authorId = Number(req.params.authorId)
	try{
		const publisher = await prisma.author.findUniqueOrThrow({
			where: {
				id: authorId,
			},
			include: {
				books: true
			}
		})
		res.send(publisher)
	}catch (err){
	 	console.error(err)
	 	res.status(404).send({
		error: "Not found."
	 	})
	}

}

/* Create a author */
export const store =  async (req: Request, res: Response)=>{
	const birthdate = (new Date(req.body.birthdate)).toISOString()

	try {
		const author = await prisma.author.create({
			data: {
				name: req.body.name,
				birthdate: birthdate,
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
export const connect = async (req:Request,res: Response)=>{
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
