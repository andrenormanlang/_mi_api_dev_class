/**
 * Register Controller
 */
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import prisma from '../prisma'
import { createUser, getUserByEmail } from '../services/user_service'

//Login as user
export const login = async (req: Request, res: Response) => {
	// destructure email and password from request body
	const {email, password} = req.body

	//find user email, otherwise bail 🛑
	const user = await getUserByEmail(email)
	if (!user) {
        return res.status(401).send({
            status: 'fail',
			message: 'Authorization required'
        })
    }

	// verify hash agains credentials, otherwise bail 🛑
	const result = await bcrypt.compare(password, user.password)
	if (!result) {
		return res.status(401).send({
            status: 'fail',
			message: 'Authorization required'
        })
    }

	//construct jwt-payload
	const payload = {
        sub: user.id, //users id // sub = subject the token is issued for
        name: user.name,

    }

	//sign payload with secret and get access token


    //respond with access token

}







/**
 * Register a new user
 */
export const register = async (req: Request, res: Response) => {
	// Check for any validation errors
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array(),
		})
	}

	//Check if a user with the incoming email already exists (other way of doing the handling)
	//const user = await prisma.user.findUnique()


	// Get only the validated data from the request
	const validatedData = matchedData(req)
	console.log("validatedData:", validatedData)

	// Calculate a hash + salt for the password
	const hashedPassword = await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10)
	console.log("Hashed password:", hashedPassword)

	// Replace password with hashed password
	validatedData.password = hashedPassword

	// Store the user in the database
	try {
		const user = await prisma.user.create({
			data:{
				name:validatedData.name,
				email: validatedData.email,
				password: validatedData.password,
			},
		})

		// Respond with 201 Created + status success
		res.status(201).send({ status: "success", data: user })

	} catch (err) {
		return res.status(500).send({ status: "error", message: "Could not create user in database" })
	}
}
