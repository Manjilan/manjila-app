var db = require('./models');
var manjila = {
  name: "Manjila",
  githubUsername: "Manjilan" ,
  githubLink: "https://github.com/Manjilan",
  image: "",
  personalWebsite: "http://manjilanakarmi.com/",
  currentCity: "Berkeley"
};

var projectList=[
  {
    projectName: "GeoQuakes",
    description: "whatever",
    githubLink: "whatever"
  },
  {
    projectName: "GeoQuakes2",
    desciption: "whatever2",
    githubLink: "whatever2"
  },
  {
    projectName: "GeoQuakes3",
    desciption: "whatever3",
    githubLink: "whatever3"
  },
  {
    projectName: "GeoQuakes4",
    desciption: "whatever4",
    githubLink: "whatever4"
  },
  {
    projectName: "GeoQuakes5",
    desciption: "whatever5",
    githubLink: "whatever5"
  }
];
db.Manjila.remove({}, function(err, manjila){
  console.log('removed profile');
  db.Manjila.create(manjila, function(err, profile){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated profile');
    console.log("created", profile);
  })
});

db.Project.remove({}, function(err, projects) {
  console.log('removed all projects');
  db.Project.create(projectList, function(err, projects){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all projects');
    console.log("created", projects.length, "projects");
  })
});
