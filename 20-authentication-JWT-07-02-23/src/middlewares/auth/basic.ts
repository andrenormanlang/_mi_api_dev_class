/**
* HTTP Basic Authentication Middleware
*/
import bcrypt from 'bcrypt'
import  Debug  from 'debug'
import {Request, Response, NextFunction} from 'express'
import { getUserByEmail } from '../../services/user_service'

const debug = Debug('prisma-books:basic')

export const basic = async (req: Request, res: Response, next: NextFunction) =>{
	debug("Hello from auth/basic!")

	// Make sure authorization header exist, otherwise bail 🛑
	if(!req.headers.authorization){
		debug("Authorization header missing")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	// Split authorization header ` `
	// "Basic(authSchema) am5AdGhlaGl2ZXJyZXNpc3RhbmNlLmNvbTphYmMxMjM=(Base64 encoded)"
	// [0]=> "Basic"
	// [1]=> "am5AdGhlaGl2ZXJyZXNpc3RhbmNlLmNvbTphYmMxMjM="
	debug("Authorization header: %o", req.headers.authorization)
	// "lol cats funny".split("") // ["lol", "cats", "funny"]
	const [authSchema, base64Payload] = req.headers.authorization.split(" ")
	// const authSchema = authParts[0]
	// const base64Payload = authParts[1]

	// Check that authorization scheme is "Basic", otherwise bail 🛑
	if (authSchema.toLowerCase() !== "basic") {
		debug("Authorization schema isn't Basic")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}
	// Decode credentials from base64 => ascii
	const decodedPayload = Buffer.from(base64Payload, "base64").toString("ascii")
	// decodedPayload ="jn@thehiverresistance.com:abc123"
	//debug("decodedPayload:", decodedPayload)

	// Split decodedPayload on `:`
	const [email, password] = decodedPayload.split(":")

	// Get user from database, otherwise bail 🛑
	// got it in service => user_service.ts
	const user = await getUserByEmail(email)
	if(!user){
		debug("User %s does not exist", email) //s is for string and o is for object

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}
	// Verify hash against credentials, otherwise bail 🛑
	debug("incoming email", email)
	debug("incoming password", password)
	debug("user", user)
	const result = await bcrypt.compare(password, user.password)
	if(!result){
		debug("Password for user %s didn´t match:", email)
		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}
	debug("Password for user %s was correct:🥳", email )

	//  Attach user to request 😁
	// => would work in vanilla js but not ts without the whole fucking mess??
	 req.user = user

	// Nothing to see here, move along... ✅
	next()
}
