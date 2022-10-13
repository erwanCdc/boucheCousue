$(document).ready(function(){

    var user 

    $.ajax({
        type: "GET",
        url: "user",
        success: (result) =>{
            console.log(result)
            user = JSON.parse(result).username
            $('#username').html(user)
        },
        async: false
    })

    $.ajax({
        type: "POST",
        url: "http://localhost:3001/get_score",
        data : {username:user},
        success: (result) =>{
            $('#score').html(JSON.parse(result).score)
        },
        async: false
    })

    return false
})

    
