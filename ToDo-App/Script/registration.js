

function registerUser(){

   let email =  __elementById("email").value; 
   let firstName =  __elementById("firstName").value; 
   let lastName =  __elementById("lastName").value;
   let password = __elementById("password").value;
   let confirmPassword = __elementById("confirmPassword").value;
   let gender = document.querySelector('input[name="gender"]:checked').value;
   let address = __elementById("address").value;
   let profileImage = (__elementById("profileImage").files[0]) ? __elementById("profileImage").files[0].name : undefined;

   formEle = { 
      email: email, 
      firstName: firstName, 
      lastName: lastName, 
      password: password, 
      confirmPassword: confirmPassword, 
      gender: gender, 
      address: address,
      profileImage: profileImage
   };
   console.log(formEle);

    var isValid = validation(formEle);

    if(isValid){
        var users = JSON.parse(localStorage.getItem('Users')) || [];
        var userData = {
               firstName:firstName,
               lastName:lastName,
               email:email,
               gender:gender,
               password:password,
               address:address,
               profileImage:previewProfileImage.src,
               todo: []
            };

        users.push(userData);
        localStorage.setItem('Users', JSON.stringify(users)); 
        window.location = "Login.html"
    }   
}

function validation(formEle) {
   
   // Hide error div
   let errorDiv = document.querySelectorAll('.invalid-feedback')
   errorDiv.forEach((ele) => {
   ele.style.display = 'none'
   })

   // let userList =  JSON.parse( localStorage.getItem("Users"));
                
   // if(userList != null) {
   //   var userdata =  userList.find( a  => a.email ==  email.value);
   //   if(userdata != null) {
   //     console.log("hello")
   //   }
   // }
   // Checking already existing mail is
   let registeredUser =  JSON.parse( localStorage.getItem("Users"));
      console.log(registeredUser);          
      if(registeredUser != undefined ) {
         var registeredUserList =  registeredUser.find( function(user) { return user.email === email.value}  );
         console.log(registeredUserList)
         if(registeredUserList  != null ) {
            __elementById("emailError").innerHTML = "Email already exists";
            __elementById("emailError").style.display = "block";
            __elementById("email").focus();
            return false;
         }
      }

   // let regex = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(formEle["profileImage"])
   // console.log(regex);

   if(formEle.email == undefined || formEle.email == "") 
   {
      __elementById("emailError").style.display = "block";
      email.focus();
      return false;
   }   

   if(formEle.email.indexOf("@", 0) < 0 || formEle.email.indexOf(".", 0) < 0) 
   {
      __elementById("emailError").innerHTML = "Email format is incorrect";
      __elementById("emailError").style.display = "block";
      __elementById("email").focus();
      return false;
   }
   
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
