/* import {User} from "@prisma/client";

declare global{
	namespace Express{
		export interface Request{
			user: User,
		}
	}
} */

import { JwtPayload } from "../../types";

declare global{
	namespace Express{
		export interface Request{
			user: JwtPayload,
		}
	}
}
