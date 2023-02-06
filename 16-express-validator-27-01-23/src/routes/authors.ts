/* Handle all / authors routes */
import express from 'express'
import {body} from 'express-validator'
import {index, show, store, update, destroy, connectBook} from '../controllers/author_controller'
const router = express.Router()

/**
 * GET /authors
 */
router.get('/', index)

/**
* POST / Authors
*/

	//[body('name').bail.exists().isString().isLength({min:3, max: 191}),],store)
	// bail in order to skip the rest of the errors in case of error in empty string
router.post('/', [
		body('name').optional().isString().withMessage('has to be a string').bail().isLength({ min: 3, max: 191 }).withMessage('has to be 3-191 chars long'),
], store)
	//can set .optional in beginning such as ISBN for example

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
