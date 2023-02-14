const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  total_pages: {
    type: Number,
    required: true
  },
  release_date: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Comics', comicsSchema)
