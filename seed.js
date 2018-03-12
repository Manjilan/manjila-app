var db = require('./models/index');

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
