/* Profile Router */

import express from "express"
import { getProfile, updateProfile } from '../controllers/profile_controller'
const router = express.Router()

/**
*GET /profile
*/
router.get('/', getProfile)

/**
*PATCH /profile
*/

/**
* GET /profile/books
*/

/**
* POST /profile/books
*/

/**
* DELETE /profile/books/:bookId
*/

export default router
