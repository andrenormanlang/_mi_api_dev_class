/* import {User} from "@prisma/client";

declare global{
	namespace Express{
		export interface Request{
			user: User,
		}
	}
} */
import { User } from '@prisma/client'
import { JwtPayload } from './../../types.d'


declare global {
	namespace Express {
		export interface Request {
			token?: JwtPayload,
			refresh_token?: JwtPayload,
			user?: User,
		}
	}
}

