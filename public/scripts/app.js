console.log("Sanity Check: JS is working!");
var $projectsList;
var allProjects = [];

$(document).ready(function(){
  $projectsList = $("#projectTarget");
  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: function(response){
      $("#info").append(`<h6> Name : ${response.name}</h6> <br>
        <h6>Github Username: ${response.githubUsername} </h6> <br>
        <h6>Github Link: <a href="https://github.com/Manjilan">${response.githubLink}</a></h6><br>
        <img src="https://media.licdn.com/dms/image/C5603AQFH2j__1g97qw/profile-displayphoto-shrink_200_200/0?e=1526079600&v=alpha&t=rNriwzE4lnGbeTs8nnwcKc7mFlwMiDTs1BjzvB0xuo8"><br>
        <h6> Portfolio Website: <a href="http://manjilanakarmi.com/">${response.personalWebsite}</a></h6> <br>
        <h6> Current City: ${response.currentCity}</h6>
        `);

      },
      error: handleError
    });

    $.ajax({
      method: 'GET',
      url: '/api/projects',
      success: handleSuccess,
      error: handleError
    });

    $('#newProjectForm').on('submit', function(e) {
      e.preventDefault();
      console.log('new project serialized', $(this).serializeArray());
      $.ajax({
        method: 'POST',
        url: '/api/projects',
        data: $(this).serializeArray(),
        success: newProjectSuccess,
        error: newProjectError
      });
    });

    function handleSuccess(json) {
      allProjects = json;
      render();
    }

    function handleError(e) {
      console.log('uh oh');
      $('#projectTarget').text('Failed to load projects, is the server working?');
    }

    function render () {
      // empty existing posts from view
      $projectsList.empty();

      // pass `allBooks` into the template function
      var projectsHtml = getAllProjectsHtml(allProjects);

      // append html to the view
      $projectsList.append(projectsHtml);
    }

    function newProjectSuccess(json) {
      $('#newProjectForm input').val('');
      allProjects.push(json);
      render();
    }

    function newProjectError() {
      console.log('newbook error!');
    }

    function getAllProjectsHtml(projects) {
      return projects.map(getProjectHtml).join("");
    }
    function getProjectHtml(project) {
      return `<hr>
      <p>
      <b class="project-title">${project.projectName}</b>
      <span class="edit-input" style="display: none">
      <p>${project.description}</p>
      <button class="edit-book-submit-button" data-id="${project._id}">Save</button>
      <button class="edit-book-button">Edit</button>
      <br>
      </form>
      `;
    }
  })
