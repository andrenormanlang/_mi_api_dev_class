import express from 'express'
import {destroy, index, show, store, update} from '../controllers/book_controller'
const router = express.Router()

/**
 * POST /books/:bookId/authors
 */
router.post('/:bookId/authors', store)

/**
* GET/ Books
*/
router.get('/', index)

router.post('/', store )

// GET /books/:bookId
router.get('/:bookId', show)

/**
 * PATCH /publishers/:publisherId
 */
router.patch('/:authorId', update)

/**
 * DELETE /publishers/:publisherId
 */
router.delete('/:authorId', destroy)



/* router.post('/:bookId/publisher', async (req,res)=>{
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
}) */

export default router
