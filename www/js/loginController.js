$(document).ready(function(){

    $('#logForm').submit(function( event ) {

        sessionStorage.setItem("username", $("#username").val())
        sessionStorage.setItem("password", $("#password").val())
        sessionStorage.setItem("score", 0)


        $.post("/user",{username:sessionStorage.getItem("username"), 
                        password:sessionStorage.getItem("password")}, function(data){
                            
        });

        document.location.href="/"


        return false

    });

})