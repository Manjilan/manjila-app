var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/manjila-app");

mongoose.Promise = global.Promise;

module.exports.Manjila = require("./manjila.js");
module.exports.Project = require("./project.js");
