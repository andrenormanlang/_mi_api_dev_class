/* Handle all / authors routes */
import express from 'express'
import {index, show, store, update, destroy, connectBook} from '../controllers/author_controller'
const router = express.Router()

/**
 * GET /authors
 */
router.get('/', index)

/**
* POST / Authors
*/
router.post('/',store)

// GET /authors/:authorId
// Also get the author's books
router.get('/:authorId', show)

/**
* PATCH / Authors
*/
router.patch('/:authorId',update)


/**
* DELETE / Authors
*/
router.delete('/:authorId',destroy)


/**
 * CONNECT /authors/:authorId/books
 */
router.post('/:authorId/books', connectBook)

/**
 * POST /authors/:authorId/books
 */
/* router.post('/:authorId/books', async (req,res)=>{
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
}) */


/* router.delete('/:authorId/books', async (req,res)=>{
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
}) */

export default router
