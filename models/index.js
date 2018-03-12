var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/manjila-app");

mongoose.Promise = global.Promise;

module.exports.Manjila = require("./manjila");
module.exports.Project = require("./project");
