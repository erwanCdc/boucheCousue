$(document).ready(function(){

    $('#loginForm').submit(function( event ) {

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
    })

})