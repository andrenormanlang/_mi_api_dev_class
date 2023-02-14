import express  from "express";
// instantiate the router
const router = express.Router();
import * as movieController from "./movie.controller";
import { moviePostRules } from "./movie.validation.rules";
// same as ?

/*
* GET / movies
*/
router.get('/', movieController.index)

/*
* GET / movies/:movieId
*/
router.get('/:movieId', movieController.show)

/*
* POST / movies
*/
router.post('/',moviePostRules, movieController.store)

export default router;
