const showLoginPage=()=>{
  $('#register-page, #main-page').hide()
  $('#login-page').show()
}

const showRegisterPage=()=>{
  $('#register-page').show()
  $('#login-page, #main-page').hide()
}

const showMainPage=()=>{
  $('#register-page,#login-page').hide()
  $('#main-page').show()
  getTodo()
}

const login=()=>{
  let email=$("#email").val()
  let password=$("#password").val()
  $.ajax({
    url: "http://localhost:3000/login",
    method: "POST",
    data:{
      email,
      password
    }
  })
  .done(response =>{
    localStorage.setItem('access_token', response.access_token)
    showMainPage()
  })
  .fail((xhr, textStatus)=>{
    console.log(xhr, textStatus)
  })
  .always(()=>{
    $("#email").val("")
    $("#password").val("")
  })
}

const register=()=>{
  let name=$("#name").val()
  let email=$("#reg-email").val()
  let password=$("#reg-password").val()
  $.ajax({
    url: "http://localhost:3000/register",
    method: "POST",
    data:{
      name,
      email,
      password
    }
  })
  .done(response =>{
    showLoginPage()
  })
  .fail((xhr, textStatus)=>{
    console.log(xhr, textStatus)
  })
  .always(()=>{
    $("name").val("")
    $("#reg-email").val("")
    $("#reg-password").val("")
  })
}

const addTodo=()=>{
  let name=$("#todo-name").val()
  let description=$("#description").val()
  let status= $("#status").find(":selected").text();
  let category=$("input[name='category']:checked").val();
  let due=$("#due").val()
  $.ajax({
    url: "http://localhost:3000/todos",
    method: "POST",
    headers:{
      access_token: localStorage.access_token
    },
    data:{
      name,
      description,
      status,
      category,
      due
    }
  })
  .done(response =>{
    console.log(response)
   
    showMainPage()
  })
  .fail((xhr, textStatus)=>{
    console.log(xhr, textStatus)
  })
  .always(()=>{
    $("#todo-name").val("")
    $("#description").val("")
    $("#due").val("")
  })
}

const getTodo=()=>{
  $.ajax({
    url: "http://localhost:3000/todos",
    method: "GET",
    headers:{
      access_token: localStorage.access_token
    }
  })
  .done(response =>{
    response.forEach(todo => {
      console.log(todo)
      $("#todos").append(`
      <div class="col-md-4">
        <div class="card mb-4 shadow-sm ">
          <img src="https://www.targettraining.eu/wp-content/uploads/2019/02/meetings-practice.jpg" class="card-img-top" alt="...">
          <div class="card-body text-left">
            <h5 class="card-title">${todo.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${todo.category}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Status: ${todo.status}</h6>
            <p class="card-text">${todo.description}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Delete</button>
              </div>
              <small class="text-muted">Due ${todo.due}</small>
            </div>
          </div>
        </div>
      </div>
     `)
    });
  })
  .fail((xhr, textStatus)=>{
    console.log(xhr, textStatus)
  })
}

const logout=()=>{
  localStorage.clear()
  showLoginPage()
}

$(document).ready(function(){
  if(localStorage.getItem('access_token')){
    showMainPage()
  }else{
    showLoginPage()
  }

  $('#login-form').on('submit', (event)=>{
    event.preventDefault()
    login()
  });

  $('#register-redirect').on('click',()=>{
    showRegisterPage()
  })

  $('#register-form').on('submit', (event)=>{
    event.preventDefault()
    register()
  })

  $('#login-redirect').on('click',()=>{
    showLoginPage()
  })

  $('#add-todo-form').on('submit', (event)=>{
    event.preventDefault()
    addTodo()
  })

  $('#logout-button').on('click',()=>{
    logout()
  })

});


/** End of Scripts **/