/* User service */
import { CreateUserData } from '../types'
/* import { userInfo } from "os"
import prisma from "../prisma"

export const getUserByEmail = async (email: string) => {
	const user = await prisma.user.findUnique({
		where:{
			email: email,
		}
	})
	return user
}
 */
/**
 * User Service
 */
import prisma from '../prisma'

/**
* @version 2.0
* @example
* @param email The email of the user to get
* @returns
*/

export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		}
	})
}


export const createUser = async (data: CreateUserData) => {
	return await  prisma.user.create({
		data: data
	})
}
