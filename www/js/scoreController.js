$(document).ready(function(){

    $('#username').html(sessionStorage.getItem('username'))

    $.ajax({
        type: "GET",
        url: "login",
        success: (result) =>{
            $('#score').html(JSON.parse(result).score)
        },
    })

    $('#logout').click(function(){
        $.ajax({
            type: "GET",
            url: "login",
            success: (page) =>{
                sessionStorage.clear()
                $('html').html(page)
            },
        })
    })

    $('#play').click(function(){
        document.location.href="/"
    })
})