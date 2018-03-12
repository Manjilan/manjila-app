var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProjectSchema = new Schema({
    projectName: String,
    description: String,
    githubLink: String
})


var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
