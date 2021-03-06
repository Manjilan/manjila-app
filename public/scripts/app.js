console.log("Sanity Check: JS is working!");
var $projectsList;
var allProjects = [];

$(document).ready(function(){
  $projectsList = $("#projectTarget");
  //Add Ajax Call
  $.ajax({
    method: 'GET',
    url: '/api/profile',
    success: function(response){
      $("#info").append(`<div class="card-panel"><h6> Name : ${response.name}</h6> <br>
      <h6>Github Username: ${response.githubUsername} </h6> <br>
      <h6>Github Link: <a href="https://github.com/Manjilan">${response.githubLink}</a></h6><br>
      <img class="circle" src="https://media.licdn.com/dms/image/C5603AQFH2j__1g97qw/profile-displayphoto-shrink_200_200/0?e=1526079600&v=alpha&t=rNriwzE4lnGbeTs8nnwcKc7mFlwMiDTs1BjzvB0xuo8"><br>
      <h6> Portfolio Website: <a href="http://manjilanakarmi.com/">${response.personalWebsite}</a></h6> <br>
      <h6> Current City: ${response.currentCity}</h6>
      </div>`);

    },
    error: handleError
  });
  //Show AJAX Call
  $.ajax({
    method: 'GET',
    url: '/api/projects',
    success: handleSuccess,
    error: handleError
  });

  //Delete AJAX Call
  $projectsList.on('click', '.delete-button', function(){
    $.ajax({
      method: 'DELETE',
      url: '/api/projects/'+$(this).attr('data-id'),
      success: deleteProject,
      error: handleError
    });
  })

  $projectsList.on('click', '.edit-project-button', function() {
      console.log('clicked edit button');
      // $('.projectDescription').hide();
      // $('.projectDescriptionInput').show();
      $(this).parent().siblings('p').toggle('projectDescription');
      $(this).parent().siblings('input').toggleClass('projectDescriptionInput');
      // $('.projectDescrptionInput').toggleClass();

      $(this).parent().prop('disabled', false);

    });

    $projectsList.on('click', '.edit-project-submit-button', function() {
      // $(this).parent().hide();
      let projectName = $(this).parent().find("input").val();
      $.ajax({
        method: "PUT",
        url: `/api/projects/${ $(this).attr('data-id') }`,
        data: { projectName: projectName },
        success: (project) => {
          $(this).parent().parent().find(".projectName").html(project.projectName);
        }
      })

    })

    $projectsList.on('click', '.save-button', function() {
      // $(this).parent().hide();
      let newDescription = $(this).parent().siblings("input").val();
      console.log(newDescription);
      $.ajax({
        method: "PUT",
        url: `/api/projects/${ $(this).attr('data-id') }`,
        data: { description: newDescription },
        success: (project) => {
          $(this).parent().siblings(".projectDescription").html(project.description);
        }
      })
      $(this).parent().siblings('p').toggle('projectDescription');
      $(this).parent().siblings('input').toggleClass('projectDescriptionInput');

    })

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

  function deleteProject(json){
    var projectId = json._id;
    console.log('delete project', projectId);
    // find the book with the correct ID and remove it from our allBooks array
    for(var index = 0; index < allProjects.length; index++) {
      if(allProjects[index]._id === projectId) {
        allProjects.splice(index, 1);
        break;
      }
    }
    render();
  }

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
    $projectsList.append(`<h3 class="card-panel">Projects</h3>${projectsHtml}`);
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
    return `<div class="card-panel">
    <p>
    <b class="project-title">${project.projectName}</b>
    <button class="save-button" data-id="${project._id}" ><i class="fas fa-save fa-lg"></i></button>
    <button class="edit-project-button"><i class="far fa-edit fa-lg"></i></button>
    <button class="delete-button" data-id="${project._id}"><i class="fas fa-trash-alt fa-lg"></i></button>
    </p>
    <hr><p class="projectDescription">${project.description}</p>
        <input type="text" class="projectDescriptionInput" value="${project.description}" />
    <br>
    </div>
    `;
  }
})
