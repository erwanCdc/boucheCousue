$(document).ready(function(){


    $.ajax({
        type: "GET",
        url: "user",
        success: (result) =>{
            console.log(result)
            $('#username').html(JSON.parse(result).username)
            $('#score').html(JSON.parse(result).score)
        },
    })
    
})