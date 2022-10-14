$(document).ready(function(){
    var user 

    $.ajax({
        type: "GET",
        url: "http://localhost:2999/user_info",
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
            $('#nb_games').html(JSON.parse(result).nb_games)
            $('#win_prct').html(JSON.parse(result).win_prct+"%")
        },
        async: false
    })

    return false
})
