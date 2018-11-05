const mongoose = require('mongoose')

const episodeSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    rating: {type: Number, required: true, default: 5}
})

module.exports = mongoose.model('Episode', episodeSchema)