
(function(){
    var currentUser =JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(currentUser)
    if(currentUser){
        console.log("hello");
        document.getElementById("firstName").value=currentUser.firstName;
        document.getElementById("lastName").value=currentUser.lastName;
        document.getElementById("email").value=currentUser.email;
        document.getElementById("password").value=currentUser.password;
        document.getElementById("confirmPassword").value=currentUser.password;
        if(currentUser.gender == 'male') 
        {
            document.getElementById("male").checked =  true;
        }
    else if(currentUser.gender == 'female')
        {
            document.getElementById("female").checked =  true;
        }
        else{
            document.getElementById("other").checked =  true;
        }
        document.getElementById("address").value=currentUser.address;
        document.getElementById("previewProfileImage").src =  currentUser.profileImage;
        // document.getElementById("profileimg").src=currentUser.profilePic;
    }
    else{
        window.location="Login.html";
    }
})();

function updateProfile(){
    var currentUser =JSON.parse(sessionStorage.getItem("currentUser"));
    if(currentUser){
        let registeredUsersList =  JSON.parse( localStorage.getItem("Users"));
        var updatedUser =  registeredUsersList.find( function(user) { return user.email === currentUser.email}  );
        var userIndex =  registeredUsersList.findIndex( function(user) { return user.email === currentUser.email}  ); 
        updatedUser.email =  __elementById("email").value; 
        updatedUser.firstName =  __elementById("firstName").value; 
        updatedUser.lastName =  __elementById("lastName").value;
        updatedUser.password = __elementById("password").value;
        updatedUser.confirmPassword = __elementById("confirmPassword").value;
        updatedUser.gender = document.querySelector('input[name="gender"]:checked').value;
        updatedUser.address = __elementById("address").value;
        updatedUser.profileImage = (__elementById("previewProfileImage").src) ? __elementById("previewProfileImage").src : undefined;
        
        var isValid = validation(updatedUser);

        if(isValid){
            for (keys in registeredUsersList[userIndex]) {                    
                    registeredUsersList[userIndex] =  updatedUser; 
                }
            localStorage.setItem("Users", JSON.stringify(registeredUsersList));
            sessionStorage.setItem("currentUser", JSON.stringify(registeredUsersList[userIndex]));
            alert("Profile updated")
            window.location = "profile.html"
        }
    } 
}

function previewFile() {
    var previewProfileImg = __elementById("previewProfileImage");
    var profileImage =  __elementById("profileImage").files[0];
    var imageReader = new FileReader();
    imageReader.onloadend = function() {
       // convert image file to base64 string
      console.log('RESULT', imageReader.result)
      previewProfileImg.src = imageReader.result
      __elementById("profileImageError").style.display = "none"
      previewProfileImg.style.display = "block"
    }
    if(profileImage){
       imageReader.readAsDataURL(profileImage);
    }
  }
 
function __elementById(id){
    return document.getElementById(id);
 }
 
 function validation(formEle) {
   
    // Hide error div
    let errorDiv = document.querySelectorAll('.invalid-feedback')
    errorDiv.forEach((ele) => {
    ele.style.display = 'none'
    })
 
    if(formEle.firstName == undefined || formEle.firstName == "") 
    {
       __elementById("firstNameError").style.display = "block";
       __elementById("firstName").focus();
       return false;
    }
    if(formEle.lastName == undefined || formEle.lastName == "") 
    {
       __elementById("lastNameError").style.display = "block";
       __elementById("lastName").focus();
       return false;        
    }
 
    if(formEle.password == undefined || formEle.password == "") 
    {
       __elementById("passwordError").style.display = "block";
       __elementById("password").focus();
       return false;
    }
    if(formEle.confirmPassword == undefined || formEle.confirmPassword == "") 
    {
       __elementById("confirmPasswordError").style.display = "block";
       __elementById("confirmPassword").focus();
       return false;
    }
    if(formEle.password != formEle.confirmPassword) 
    {
       __elementById("confirmPasswordError").style.display = "block";
       __elementById("confirmPasswordError").innerHTML = "Password and Confirm Password does not match";
       __elementById("confirmPassword").focus();
       return false;
    }
    if(formEle.gender == undefined || formEle.gender == "") 
    {
       __elementById("genderError").style.display = "block";
       return false;
    }
    if(formEle.address == undefined || formEle.address == "") 
    {
       __elementById("addressError").style.display = "block";
       __elementById("address").focus();
       return false;
    }   
    if(formEle.profileImage == undefined || formEle.profileImage == "") 
    {
       __elementById("profileImageError").style.display = "block";
       return false;
    }
    return true; 
 
 
 }