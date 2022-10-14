$(document).ready(function(){

    $('#loginForm').submit(function( event ) {

        sessionStorage.setItem("username", $("#username").val())
        sessionStorage.setItem("password", $("#password").val())


        $.ajax({
            type: "POST",
            url: "http://localhost:2999/log_user",
            data: {username:sessionStorage.getItem("username"), 
            password:sessionStorage.getItem("password")},
            success: function(auth){
                if (auth){
                    $.ajax({
                        type: "GET",
                        url: "game",
                        success: (page) =>{
                            $('#page').html(page)
                        },
                        async: false
                    })
                }
                else{
                    alert('Login Failed !')
                }
                
            }
        })

        return false
    })

})