const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  moviename: {type:String, require:true},
  category: {type:String, required:true},
  actors: [{type:String, ref:"users"}]
})

const movie = mongoose.model("movies", movieSchema)

module.exports = movie;
