$(document).ready(function(){

    function init(){
        let word = ""

        $.ajax({
            url: '/get_mot',
            success: (result) =>{
                word = JSON.parse(result).word
            },
            async: false
        });

        console.log('before return : ' + word)
        return word
    }


    console.log('after function : ' + init())
    
})