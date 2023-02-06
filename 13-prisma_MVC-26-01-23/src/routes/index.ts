import express from "express"
import authorsRouter from './authors'
import booksRouter from './books'
import publishersRouter from './publishers'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

router.use('/authors', authorsRouter )
router.use('/books', booksRouter )
router.use('/publishers', publishersRouter )

export default router
