var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var ManjilaSchema = new Schema({
  name: String,
  githubUsername: String,
  githubLink: String,
  image: String,
  personalWebsite: String,
  currentCity: String,
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project"
  }
});

var Manjila = mongoose.model('Manjila', ManjilaSchema);

module.exports = Manjila;
