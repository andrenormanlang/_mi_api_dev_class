/**
 * Type Definitions
 */



export type CreateAuthorData = {
	name: string,
}

export type CreateUserData = {
	name: string,
	email: string,
	password: string
}

export type JwtPayload ={
	sub: number,
	name: string,
	email: string,
	iat?: number,
	exp?: number
}

/* createBook {
	name: string,
	pages: number,
	isbn: string?,
	cover: {
		thumbnail: string,
		large: string,
	}?,
	publisherId: number,
}
 */
