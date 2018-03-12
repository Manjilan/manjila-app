var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var db = require("./models/index");

var personal = [];
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

// Configure app
app.set('views', __dirname + 'views');      // Views directory
app.use(express.static('public'));          // Static directory
app.use(bodyParser.urlencoded({ extended: true })); // req.body

// Set CORS Headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  // But you should change almost every line of this response.
  res.json({
    message: "Welcome to my world people!!!",
    documentationUrl: "https://github.com/Manjilan/manjila-app", // CHANGE ME
    baseUrl: "https://enigmatic-woodland-73386.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", path: "/api/projects", description: "Projects"},
      {method: "POST", path: "/api/projects", description: "Create Project"},
      {method: "GET", path: "/api/projects/:id", description: "Show Project"},
      {method: "PUT", path: "/api/projects/:id", description: "Update Project"},
      {method: "DELETE", path: "/api/projects/:id", description: "Delete Project"}
    ]
  })
});


//**************Routes******************//
app.get('/api/profile', function showMyProfile(req, res){
  var project = db.Project.find({}, function(err, allProjects){
    if (err) {
      console.log(err);
    } else {
    res.json({
      name: "Manjila",
      githubUsername: "Manjilan" ,
      githubLink: "https://github.com/Manjilan",
      image: "https://media.licdn.com/dms/image/C5603AQFH2j__1g97qw/profile-displayphoto-shrink_200_200/0?e=1526079600&v=alpha&t=rNriwzE4lnGbeTs8nnwcKc7mFlwMiDTs1BjzvB0xuo8",
      personalWebsite: "http://manjilanakarmi.com/",
      currentCity: "Berkeley",
      projects: allProjects
      })
    }
  })
});
//Show al projects
app.get('/api/projects', function(req, res){
  var project = db.Project.find({}, function(err, allProjects){
    if (err) {
      console.log(err);
    } else {
      res.json(allProjects);
    }
  })
});
//Show one project
app.get('/api/projects/:id', function(req, res){
  db.Project.findOne({_id: req.params.id }, function(err, data) {
    res.json(data);
  });
});

// delete book
app.delete('/api/Projects/:id', function (req, res) {

  console.log('project delete', req.params);
  db.Project.findOneAndRemove({ _id: req.params.id})
    .populate('project')
    .exec(function (err, deletedproject) {
      res.json(deletedproject);
  });
});


//Server Commands
app.listen((process.env.PORT || 3000), function() {
    console.log("Server running on port 3000...")
});
