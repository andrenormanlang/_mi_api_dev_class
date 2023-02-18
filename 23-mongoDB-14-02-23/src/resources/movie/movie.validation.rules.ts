import { body } from 'express-validator'

// Lägg på validering med hjälp av  'express-validator'  så film måste ha:
// 'title' string, required, min 3
// 'runtime' number, min 1
// 'releaseYear' number, min 1888, (🖖)

export const moviePostRules = [
	body('title').isString().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
	body('runtime').isInt({ min: 3 }).withMessage('Runtime be at least 3 minutes'),
	body('releaseYear').isInt({ min: 1888 }).withMessage('Release year must be at least 1888'),
]
