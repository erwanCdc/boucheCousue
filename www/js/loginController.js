$(document).ready(function(){

    $('#logForm').submit(function( event ) {

        sessionStorage.setItem("username", $("#username").val())
        sessionStorage.setItem("password", $("#password").val())
        sessionStorage.setItem("score", 0)

    });

})