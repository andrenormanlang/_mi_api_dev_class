import express, {Request, Response, Router} from 'express';
import { validateRequestSchema } from '../middleware/validate-request-schema';
import { registerSchema } from '../schema/register-schema';


const rootRouter = Router();
rootRouter.post(
	'/register',
	registerSchema,
  	validateRequestSchema,
  	(req: express.Request, res: Response) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
	res.sendStatus(201);
  	},
);

export{rootRouter as router};
