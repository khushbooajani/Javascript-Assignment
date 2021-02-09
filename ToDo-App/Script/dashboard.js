let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
(function(){
    if(currentUser == undefined) 
    {
        window.location = "Login.html" ;       
    }

})();


let registeredUsersList =  JSON.parse( localStorage.getItem("Users"));
if(registeredUsersList != undefined ) {
    var todoList =  registeredUsersList.find( function(user) { return user.email === currentUser.email}  ).todo;
    var userIndex =  registeredUsersList.findIndex( function(user) { return user.email === currentUser.email}  );
    
    var todoArr = [];
    if(todoList)
        todoArr = todoList
}
displayTodos(todoArr)
let editIndex = ''
var today = new Date();


// ToDo display 
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
    content.style.maxHeight = null;
    } else {
    content.style.maxHeight = content.scrollHeight + "px";
    } 
});
}
// Todo display end


function logout(){
    sessionStorage.removeItem("currentUser");
    window.location = "Login.html" ; 
}

function createTask(){
    let taskName = __elementById("taskName").value;
    let category = __querySelector('input[name="category"]:checked') ? __querySelector('input[name="category"]:checked').value : undefined;
    let isPublic = __querySelector('input[name="public"]:checked')? __querySelector('input[name="public"]:checked').value : undefined;
    let status = __querySelector('input[name="status"]:checked')? __querySelector('input[name="status"]:checked').value : undefined;
    let todoDate = __elementById("todoDate") ? __elementById("todoDate").value : undefined;
    let isReminder = __querySelector('input[name="isReminder"]:checked')? __querySelector('input[name="isReminder"]:checked').value : undefined;
    let reminderDate = (__elementById("reminderDate")) ? __elementById("reminderDate").value : undefined;
    let todoImage = (__elementById("previewTodoImage").src) ? __elementById("previewTodoImage").src : "../images/default-todo-icon.png";
    console.log(todoDate)
    var addTodo = {
        taskName: taskName,
        category: category,
        isPublic: isPublic,
        status: status,
        todoDate: todoDate,
        isReminder: isReminder,
        reminderDate : reminderDate,
        todoImage: todoImage
    }
    console.log(currentUser.todo)
    var isValid = validation(addTodo)
    if(isValid){
        todoArr.push(addTodo);
        registeredUsersList[userIndex].todo = todoArr;
        localStorage.setItem("Users",JSON.stringify(registeredUsersList));
        alert("Task added in ToDo List")

        window.location="dashboard.html";
    }
        //todo.push(addTodo);
        console.log(registeredUsersList)
    displayTodos(todoArr);
}

function validation(addTodo){
   // Hide error div
   let errorDiv = document.querySelectorAll('.invalid-feedback')
   errorDiv.forEach((ele) => {
   ele.classList.remove("show")
   ele.classList.add("hide")
   })

   if(addTodo.taskName == undefined || addTodo.taskName == ""){
        __elementById("taskNameError").classList.remove("hide")
        __elementById("taskNameError").classList.add("show")
        __elementById("taskName").focus();
        return false;
   }

   //Validate to avoid using same Task Name
   if(todoList)
   var existingTodoName = todoList.find(function(todoEle) { return todoEle.taskName === addTodo.taskName }  )
   console.log(existingTodoName)
   if(existingTodoName != null){
        __elementById("taskNameError").innerHTML = "Task Name already Exists"
        __elementById("taskNameError").classList.remove("hide")
        __elementById("taskNameError").classList.add("show")
        __elementById("taskName").focus();
        return false;
   }

   if(addTodo.category == undefined || addTodo.category == ""){
        __elementById("categoryError").classList.remove("hide")
        __elementById("categoryError").classList.add("show")
        __elementById("category").focus();
        return false;
    }

   if(addTodo.isPublic == undefined || addTodo.isPublic == ""){
        __elementById("isPublicError").classList.remove("hide")
        __elementById("isPublicError").classList.add("show")
        return false;
    }
   if(addTodo.status == undefined || addTodo.status == ""){
        __elementById("statusError").classList.remove("hide")
        __elementById("statusError").classList.add("show")
        return false;
    }
   if(addTodo.todoDate == undefined || addTodo.todoDate == ""){
        __elementById("todoDateError").classList.remove("hide")
        __elementById("todoDateError").classList.add("show")
        __elementById("todoDate").focus();
        return false;
    }
    var todoDateSelected = new Date(addTodo.todoDate);
    
    if(validateDate(today, todoDateSelected)){
        __elementById("todoDateError").innerHTML = "Date should not be from the past"
        __elementById("todoDateError").classList.remove("hide")
        __elementById("todoDateError").classList.add("show")
        __elementById("todoDate").focus();
        return false;

    }
   if(addTodo.isReminder == undefined || addTodo.isReminder == ""){
        __elementById("isReminderError").classList.remove("hide")
        __elementById("isReminderError").classList.add("show")
        return false;
    }
    if(addTodo.isReminder == "yesReminder"){
        if(addTodo.reminderDate == undefined || addTodo.reminderDate == ""){
            __elementById("reminderDateError").classList.remove("hide")
            __elementById("reminderDateError").classList.add("show")
            __elementById("reminderDate").focus();
            return false;
        }
        var todoReminderDateSelected = new Date(addTodo.reminderDate);
        if(validateDate(today, todoReminderDateSelected)){
            __elementById("reminderDateError").innerHTML = "Date should not be from past"
            __elementById("reminderDateError").classList.remove("hide")
            __elementById("reminderDateError").classList.add("show")
            __elementById("reminderDate").focus();
            return false;
    
        }
        if(validateDate(todoReminderDateSelected, todoDateSelected)){
            __elementById("reminderDateError").innerHTML = "Date should not be from future of todo date"
            __elementById("reminderDateError").classList.remove("hide")
            __elementById("reminderDateError").classList.add("show")
            __elementById("reminderDate").focus();
            return false;    
        }
    }
   if(addTodo.todoImage == undefined || addTodo.todoImage == ""){
        __elementById("todoImageError").classList.remove("hide")
        __elementById("todoImageError").classList.add("show")
        __elementById("reminderDate").focus();
        return false;
    }

   return true;
}

function displayTodos(todoArr){
        let displayTodoDiv = __elementById("displayTodo");
        let html = ''
        if(todoArr.length > 0){
            __elementById("noTodo").style.display = "none"
            todoArr.forEach((element, index) => {
                
                html += `
                    <input type="checkbox" class="todoCheckbox" name="todoCheckbox" value="${element.taskName}" title="Selected Todo will be Deleted">          
                    <button class="edit-todo" type="button" data-toggle="modal" data-target="#addTaskModal" onclick="editTodo(${index})"><i class="fa fa-edit" title="Edit"></i></button>
                    <button class="collapsible" id="${index}" name="taskName">${element.taskName}</button>
                    <div class="content">
                    <div class="card" >
                    <img src="${element.todoImage}" class="card-img-top" alt="...">
                    <ul class="list-group list-group-flush">
                        <h5 class="card-title">${element.taskName}</h5>
                    <li class="list-group-item">Category: ${element.category}</li>
                    <li class="list-group-item">Public: ${element.isPublic}</li>
                    <li class="list-group-item">Status: ${element.status}</li>
                    <li class="list-group-item">ToDo Date: ${element.todoDate}</li>
                    <li class="list-group-item">Reminder Set: ${element.isReminder}</li>
                    ${(element.isReminder === "yesReminder") ? '<li class="list-group-item">Reminder Set: ' +  element.reminderDate + ' </li>' : ''}
                    
                    </ul>
                </div>
                    </div>
                    <br>
                `
            });
    }
    displayTodoDiv.innerHTML = html
}

function editTodo(index){
    editIndex = index
    __elementById("update-task-btn").setAttribute("onclick", "updateTodo();");
    __elementById("add-task-btn").classList.add("hide"); 
    __elementById("update-task-btn").classList.add("show");
    __elementById("taskName").value = todoArr[editIndex].taskName
    __elementById("taskName").readOnly = true;
    __elementById("todoDate").value = todoArr[editIndex].todoDate
    __elementById("previewTodoImage").src = todoArr[editIndex].todoImage
    __elementById("previewTodoImage").classList.remove("invalid-feedback")

    if(todoArr[editIndex].category == 'personal') 
        {
            __elementById("personalCategory").checked =  true;
        }
    else 
        {
            __elementById("workCategory").checked =  true;
        }
    if(todoArr[editIndex].isPublic == 'yesPublic') 
        {
            __elementById("yesPublic").checked =  true;
        }
    else 
        {
            __elementById("notPublic").checked =  true;
        }
    if(todoArr[editIndex].status == 'isDone') 
        {
            __elementById("isDone").checked =  true;
        }
    else 
        {
            __elementById("isPending").checked =  true;
        }
    if(todoArr[editIndex].isReminder == 'yesReminder') 
        {
            __elementById("yesReminder").checked =  true;
            __elementById("reminderDate").value = todoArr[editIndex].reminderDate
            __elementById("reminderDateDiv").style.display = "flex";

        }
    else 
        {
            __elementById("noReminder").checked =  true;
        }
}

function updateTodo(){
    console.log(editIndex)
    console.log(todoArr[editIndex])
    todoArr[editIndex].taskName = __elementById("taskName").value;
    todoArr[editIndex].category = __querySelector('input[name="category"]:checked').value;
    todoArr[editIndex].isPublic = __querySelector('input[name="public"]:checked').value;
    todoArr[editIndex].status = __querySelector('input[name="status"]:checked').value;
    todoArr[editIndex].todoDate = __elementById("todoDate").value;
    todoArr[editIndex].isReminder = __querySelector('input[name="isReminder"]:checked').value;
    todoArr[editIndex].reminderDate = (__elementById("reminderDate")) ? __elementById("reminderDate").value : undefined;
    todoArr[editIndex].todoImage = (__elementById("previewTodoImage").src) ? __elementById("previewTodoImage").src : "../images/default-todo-icon.png";
    console.log(todoArr)
    
    var updateThisTodo = todoArr[editIndex]
    var isValid = validateToUpdate(updateThisTodo)
    if(isValid){
        registeredUsersList[userIndex].todo = todoArr;        
        localStorage.setItem("Users",JSON.stringify(registeredUsersList));
        alert("Task updated in ToDo List")
        window.location="dashboard.html";
        displayTodos(todoArr);
    }  

}

function deleteSelectedTodos(){
    var confirmation = confirm("Do you want to Delete Selected Todos? ")
    if(confirmation == true) {
        let registeredUsersList =  JSON.parse( localStorage.getItem("Users"));
        if(registeredUsersList != undefined ) {
            var todoList =  registeredUsersList.find( function(user) { return user.email === currentUser.email}  ).todo;
            var userIndex =  registeredUsersList.findIndex( function(user) { return user.email === currentUser.email}  );
            var todoArr = [];
            todoArr = todoList
        }

        var checkboxesChecked = document.getElementsByName("todoCheckbox");
        
        var selectedCheckBoxesCounter = 0
        
        // loop over them all
        for (var i=0; i<checkboxesChecked.length; i++) {
            // Delete the checked checkboxes
            if (checkboxesChecked[i].checked) {
                selectedCheckBoxesCounter++;
                var itemToDelete = checkboxesChecked[i].value;
                todoArr = todoArr.filter(function(todo){ return todo.taskName !== itemToDelete})
                //todoArr.splice(checkboxesChecked[i].value, 1);
            }
        }
        if(selectedCheckBoxesCounter > 0) {
            registeredUsersList[userIndex].todo = todoArr
            localStorage.setItem("Users",JSON.stringify(registeredUsersList));
            alert("Selected Todos deleted from the list")
            window.location="dashboard.html";
            displayTodos(todoArr);
        }
        else{
            alert("No Todos Selected")
        }
    }
}

function searchTaskByName(){
    if(todoArr.length > 0){
        //var allaskName = document.getElementsByName("taskName");
        var searchTaskName = __elementById("search-task").value
        if(searchTaskName !== ""){
            var findName =  todoArr.filter( function(todo) { return todo.taskName === searchTaskName });        
            displayTodos(findName)
        }
        else{
            alert("Please enter task name to search")
        }
    }
    else{
        alert("Please Add Todo to Search Name")
    }
}
 
function searchByCategory(){
    var searchCategory = __elementById("searchCategory");
    var categorySelected = (searchCategory.options[searchCategory.selectedIndex].text).toLowerCase();
    console.log(categorySelected)
    if(todoArr.length > 0){
        if(categorySelected !== "Search by Category..."){
            var searchedCategory =  todoArr.filter( function(todo) { return todo.category === categorySelected }); 
        }
        else{
            alert("Please Category to search")
        }       
        console.log(searchedCategory)
        displayTodos(searchedCategory)
    }
    else{
        alert("Please Add Todo to Filter")
    }
 }

function searchByStatus(){
    var searchStatus = __elementById("searchStatus");
    var statusSelected = searchStatus.options[searchStatus.selectedIndex].text;
    console.log(statusSelected)
    if(todoArr.length > 0){
        if(statusSelected !== "Search by Status..."){
            var searchedStatus =  todoArr.filter( function(todo) { return todo.status === statusSelected });        
            console.log(searchedStatus)
            displayTodos(searchedStatus)
        }
        else{
            alert("Please Category to search")
        }
    }
    else{
        alert("Please Add Todo to Filter")
    }
 }
function displayAllTodos(){
    if(todoArr.length > 0){
        displayTodos(todoArr);
        __elementById("search-task").value = ""
    }
    else{
        alert("Please Add Todo to Display")
    }
}

function validateToUpdate(addTodo){
    // Hide error div
    let errorDiv = document.querySelectorAll('.invalid-feedback')
    errorDiv.forEach((ele) => {
    ele.classList.remove("show")
    ele.classList.add("hide")
    })
 
    if(addTodo.category == undefined || addTodo.category == ""){
         __elementById("categoryError").classList.remove("hide")
         __elementById("categoryError").classList.add("show")
         __elementById("category").focus();
         return false;
     }
 
    if(addTodo.isPublic == undefined || addTodo.isPublic == ""){
         __elementById("isPublicError").classList.remove("hide")
         __elementById("isPublicError").classList.add("show")
         return false;
     }
    if(addTodo.status == undefined || addTodo.status == ""){
         __elementById("statusError").classList.remove("hide")
         __elementById("statusError").classList.add("show")
         return false;
     }
    if(addTodo.todoDate == undefined || addTodo.todoDate == ""){
         __elementById("todoDateError").classList.remove("hide")
         __elementById("todoDateError").classList.add("show")
         __elementById("todoDate").focus();
         return false;
     }
     var todoDateSelected = new Date(addTodo.todoDate);
    
    if(validateDate(today, todoDateSelected)){
        __elementById("todoDateError").innerHTML = "Date should not be from the past"
        __elementById("todoDateError").classList.remove("hide")
        __elementById("todoDateError").classList.add("show")
        __elementById("todoDate").focus();
        return false;

    }
    if(addTodo.isReminder == undefined || addTodo.isReminder == ""){
         __elementById("isReminderError").classList.remove("hide")
         __elementById("isReminderError").classList.add("show")
         return false;
     }
     if(addTodo.isReminder == "yesReminder"){
         if(addTodo.reminderDate == undefined || addTodo.reminderDate == ""){
             __elementById("reminderDateError").classList.remove("hide")
             __elementById("reminderDateError").classList.add("show")
             __elementById("reminderDate").focus();
             return false;
         }
        var todoReminderDateSelected = new Date(addTodo.reminderDate);
        if(validateDate(today, todoReminderDateSelected)){
            __elementById("reminderDateError").innerHTML = "Date should not be from past"
            __elementById("reminderDateError").classList.remove("hide")
            __elementById("reminderDateError").classList.add("show")
            __elementById("reminderDate").focus();
            return false;
    
        }
        if(validateDate(todoReminderDateSelected, todoDateSelected)){
            __elementById("reminderDateError").innerHTML = "Date should not be from future of todo date"
            __elementById("reminderDateError").classList.remove("hide")
            __elementById("reminderDateError").classList.add("show")
            __elementById("reminderDate").focus();
            return false;    
        }
     }
    if(addTodo.todoImage == undefined || addTodo.todoImage == ""){
         __elementById("todoImageError").classList.remove("hide")
         __elementById("todoImageError").classList.add("show")
         __elementById("reminderDate").focus();
         return false;
     }
 
    return true;
 }

function displayRemindeDateDiv(reminder){
   if(reminder.value == "yesReminder"){
        __elementById("reminderDateDiv").style.display = "flex"
   }
   else{
    __elementById("reminderDateDiv").style.display= "none"
   }
}


function todoImage() {
    var previewTodoImg = __elementById("previewTodoImage");
    var todoImage =  __elementById("todoImage").files[0];
    //var file  = ele.files[0];
    var imageReader = new FileReader();
    imageReader.onloadend = function() {
       // convert image file to base64 string
      console.log('RESULT', imageReader.result)
      previewTodoImg.src = imageReader.result
      __elementById("todoImageError").style.display = "none"
      previewTodoImg.style.display = "block"
    }
    if(todoImage){
       imageReader.readAsDataURL(todoImage);
    }
  }

function __elementById(id){
    return document.getElementById(id);
 }
function __querySelector(id){
    return document.querySelector(id);
 }
function validateDate(firstDate, secondDate) {
if (firstDate.setHours(0, 0, 0, 0) > secondDate.setHours(0, 0, 0, 0)) {
    return true;
}  
return false;
};
