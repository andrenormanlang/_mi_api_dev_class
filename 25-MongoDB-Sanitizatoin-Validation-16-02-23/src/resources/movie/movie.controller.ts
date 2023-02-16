import {Request, Response} from 'express';
import Debug from 'debug';
import {Movie} from './movie.model'
// import {validationResult} from 'express-validator' //matchedData is another function of express-validator
import mongoose from 'mongoose';

const debug = Debug('lmdb:movie.controller');

/**
*Get all movies
*/
export const  index = async (req: Request, res: Response) => {
	try{
		// find all movies
		const movies =  await Movie.find()
        res.send({
			status:'success',
			data: movies,
		})

	} catch(err){
		debug("Error thrown when finding movies");
		res.status(500).send({status:'error', message: "Error thrown when finding movies"});
	}
}

/**
*Get a single movie
* GET /movie/:movieId
*/
export const  show = async (req: Request, res: Response) => {
	const movieId = req.params.movieId
	try{
		// Find a single movie
		const movie =  await Movie.findById(movieId) //LOOK IN MONGOOSE DOCS
		// If no movie was found, report 404
		if(!movie){
			return res.sendStatus(404)
		}
		// Respond with movie
		res.send({
			status:'success',
			data: movie,
		})

	} catch(err){
		debug
		("Error thrown when finding movie '%s' : %o",
		movieId, err)
		res.status(500).
		send
		({status:'error',
		message: "Error thrown when finding movie"});
	}
}


export const  store = async (req: Request, res: Response) => {
	// const createMovie = req.body.movie
	// const validationErrors = validationResult(req)
	// if (!validationErrors.isEmpty()) {
	// 	return res.status(400).send({
	// 		status: "fail",
	// 		data: validationErrors.array(),
	// 	})
	// }
	try{
		// const movie =  await Movie.create() //LOOK IN MONGOOSE DOCS
		const movie =  await new Movie(req.body).save() //LOOK IN MONGOOSE DOCS
		// Respond with movie
		res.status(201).send({
			status:'success',
			data: movie,
		})

		const err = new Error()

	} catch(err){
		debug
		("Error thrown when posting a movie '%s' : %o", err)
		if(err instanceof mongoose.Error.ValidationError){
			return res.status(400).send({
                status: "error",
                message: err.message,
            })

		}
		res.status(500).
		send
		({status:'error',
		message: 'error when creating a movie'});
	}
}
