function loginUser(){

    let userEmail = __elementById("email").value;
    let userPassword = __elementById("password").value;

    // Hide error div
   let errorDiv = document.querySelectorAll('.invalid-feedback')
   errorDiv.forEach((ele) => {
   ele.style.display = 'none'
   })

    if(userEmail == undefined || userEmail == "") 
   {
      __elementById("emailError").style.display = "block";
      email.focus();
      return false;
   }   
   if(userEmail == undefined || userEmail == "") 
   {
      __elementById("emailError").style.display = "block";
      email.focus();
      return false;
   }   

   if(userEmail.indexOf("@", 0) < 0 || userEmail.indexOf(".", 0) < 0) 
   {
      __elementById("emailError").innerHTML = "Email format is incorrect";
      __elementById("emailError").style.display = "block";
      __elementById("email").focus();
      return false;
   }
   
   let registeredUserList =  JSON.parse( localStorage.getItem("Users"));
   console.log(registeredUserList);          
   if(registeredUserList != undefined ) {
      var currentUser =  registeredUserList.find( function(user) { return user.email === userEmail}  );
      if(currentUser  !=  null &&  userEmail ===  currentUser.email && userPassword === currentUser.password) {
        //   console.log(currentUser)
        // if(userEmail ===  currentUser.email && userPassword === currentUser.password ){
            sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
            window.location = "dashboard.html"
        }
        else{
            __elementById("loginError").style.display = 'block';  
            return false; 
            }
      //}
   }

   // Checking already existing mail is
    // let registeredUsers =  JSON.parse( localStorage.getItem("Users"));
    // console.log(registeredUsers[0][0]);    
    // let userList = registeredUsers[0][0];
    //   if(userList != undefined && userList.length > 0) {
    //      var currentUser =  userList.find( user  => user.email == email);
    //      console.log(currentUser)
        //  if(currentUser) {
        //     if(userEmail === currentUser.email && userPassword ===  currentUser.password){
        //         sessionStorage.setItem("currentUser", JSON.stringify(userdata));
        //         return true;
        //     }            
        //  }
        //  else{
        //     __elementById("loginError").style.display = 'block';  
        //     return false; 
        //     }
      //}

      if(userPassword == undefined || userPassword == "") 
      {
         __elementById("passwordError").style.display = "block";
         __elementById("password").focus();
         return false;
      }
      

}
function __elementById(id){
    return document.getElementById(id);
 }

