$(document).ready(function(){

    $('#registerForm').submit(function( event ) {

        if ($("#password").val() == $("#confirm_password").val()){
            sessionStorage.setItem("username", $("#username").val())
            sessionStorage.setItem("password", $("#password").val())
    
    
            $.ajax({
                type: "POST",
                url: "http://localhost:2999/register_user",
                data: {username:sessionStorage.getItem("username"), 
                password:sessionStorage.getItem("password")},
                success: function(auth){
                    if (auth){
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:3001/already_played",
                            data:{username:sessionStorage.getItem("username")},
                            success: (played) =>{
                                if (played){
                                    $.ajax({
                                        type: "GET",
                                        url: "alrdy_played",
                                        success: (page) =>{
                                            $('#page').html(page)
                                        },
                                        async: false
                                    })
                                }
                                else{
                                    $.ajax({
                                        type: "GET",
                                        url: "game",
                                        success: (page) =>{
                                            $('#page').html(page)
                                        },
                                        async: false
                                    })
                                }
                            },
                            async: false
                        })
                    }
                    else{
                        alert('Account already exists !')
                    }

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