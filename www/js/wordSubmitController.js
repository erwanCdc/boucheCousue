$(document).ready(function(){

    
    $('#gamePlace').submit(function() {
        var wordAttempt = $("#testWord")[0].value;
        return false;
    });


    var mot = $.get("/mot").responseText;
    console.log(mot);
    

});