var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/manjila-app");

mongoose.Promise = global.Promise;

module.exports.Manjila = require("./manjila");
module.exports.Project = require("./project");
