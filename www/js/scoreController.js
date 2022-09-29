$(document).ready(function(){

    $('#username').html(sessionStorage.getItem('username'))


    var score
    $.ajax({
        url: '/score',
        success: (result) =>{
            score = result
        },
        async: false
    });

    

    $('#score').html(score)
    
    $('#logout').click(function(){
        sessionStorage.clear()
        document.location.href="/"
    })

    $('#play').click(function(){
        document.location.href="/"
    })
})