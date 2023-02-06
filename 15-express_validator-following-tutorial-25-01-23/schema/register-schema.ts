import {body} from 'express-validator';

const schema =[
	// username must be an email
	body('email')
		.isEmail()
		.withMessage('email must contain a valid email address'),
	body('firstName')
		.exists({checkFalsy: true}), //Does not accept null
	// password must be at least 5 chars long
	body('password')
		.isLength({ min: 5 })
		.withMessage('password must be at least 5 characters long'),
]

export {schema as registerSchema}
