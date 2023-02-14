const express = require('express')
const comics = require('../models/comicsModel')

const router = express.Router()

// GET all workouts
router.get('/', (req, res) => {
  res.json({mssg: 'GET all comics'})
})

// GET a single comic book
router.get('/:id', (req, res) => {
  res.json({mssg: 'GET a single comic'})
})

// POST a new comic book
router.post('/', async (req, res) => {
  const {title, total_pages, release_date, label } = req.body

  try {
    const workout = await Comics.create({title, total_pages, release_date, label})
    res.status(200).json(comics)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

// DELETE a comic book
router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE a comic book'})
})

// UPDATE a workout
router.patch('/:id', (req, res) => {
  res.json({mssg: 'UPDATE a comic book'})
})

module.exports = router



