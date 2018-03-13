var db = require('./models');

var projectList=[
  {
    projectName: "GeoQuake",
    description: "An app that tracks the earthquakes and pins them on the map",
    githubLink: "https://manjilan.github.io/geoquakes/"
  },
  {
    projectName: "Catalyst",
    description: "A motivational app that quotes strong women.",
    githubLink: "https://manjilan.github.io/Catalyst/"
  },
  {
    projectName: "Marvel API",
    description: "Alphabetically shows 4 Marvel comic book characters, upon clicking on the picture, description is shown.",
    githubLink: "https://manjilan.github.io/Project0/funpage.html"
  },
  {
    projectName: "Trivia Game",
    description: "A trivia game made in the terminal using ruby.",
    githubLink: "https://github.com/Manjilan/trivia-game"
  },
  {
    projectName: "Eventure",
    description: "An app for looking at events and adventures nearby San Francisco Area.",
    githubLink: "https://github.com/Manjilan/project1-eventure"
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
