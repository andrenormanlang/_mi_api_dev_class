/**
 * Profile Controller
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import prisma from '../prisma'
const debug = Debug("prisma-books:profile_controller")
/**
 * Get the authenticated user´s profile
 */
export const getProfile = async (req: Request, res: Response) =>{
	//User has authenticated sucessfully

	//WHO DIS?!
	res.send({
		status: "success",
		data: {
			data: req.token,
		},
	})
}

/**
 * Update the authenticated user´s profile
 */
export const updateProfile = async (req: Request, res: Response) => {
}

/**
 * Create a resource
 */
export const store = async (req: Request, res: Response) => {
}

/**
 * Update a resource
 */
export const update = async (req: Request, res: Response) => {
}

/**
 * Delete a resource
 */
export const destroy = async (req: Request, res: Response) => {
}

