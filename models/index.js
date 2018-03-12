var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/manjila-app");

mongoose.Promise = global.Promise;
