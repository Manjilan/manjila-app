var db = require('./models');

var projectList=[
  {
    projectName: "GeoQuake",
    description: "whatever",
    githubLink: "whatever"
  },
  {
    projectName: "Portfolio Website",
    description: "whatever2",
    githubLink: "whatever2"
  },
  {
    projectName: "Marvel API",
    description: "whatever3",
    githubLink: "whatever3"
  },
  {
    projectName: "Trivia Game",
    description: "whatever4",
    githubLink: "whatever4"
  },
  {
    projectName: "Eventure",
    description: "whatever5",
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
