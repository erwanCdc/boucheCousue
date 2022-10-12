$(document).ready(function(){

    $('#registerForm').submit(function( event ) {

        if ($("#password").val() == $("#confirm_password").val()){
            sessionStorage.setItem("username", $("#username").val())
            sessionStorage.setItem("password", $("#password").val())
            sessionStorage.setItem("score", 0)
    
    
            $.ajax({
                type: "POST",
                url: "log_user",
                data: {username:sessionStorage.getItem("username"), 
                password:sessionStorage.getItem("password")},
                success: function(page){
                    $('#page').html(page);
                }
            })

            return false
        }
        else{
            $("#password").val('')
            $("#confirm_password").val('')
            alert("Passwords doesn't match !")
            return false
        }




    })

})