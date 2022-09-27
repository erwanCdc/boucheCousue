$(document).ready(function(){

    
    $('#gamePlace').submit(function() {
        var wordAttempt = $("#testWord")[0].value;
        return false;
    });


    var mot = $.get("/mot").responseText;
    console.log(mot);

    var test = 'abracadabri'
    var test2 = 'abracidabri'
    
    function word_comparison (input_word, submit_word){
    
        len = submit_word.length
        
        input_word.toUpperCase()
        submit_word.toUpperCase()
        
        if (input_word === submit_word){
        
            console.log('You succeed ! <3')
        
        } else {
        
            input_word_split = input_word.split("")
            submit_word_split = submit_word.split("")
        
            let result = []
        
            for (let i=0; i<len; i++){
        
            if (input_word_split[i] === submit_word_split[i]){
                // Correct letter in the right place
                result[i] = submit_word_split[i]
            } else {
                if (input_word.includes(submit_word_split[i])){
                    // Correct letter but not in the right place
                    result[i] = '?'
                } else {
                    // Uncorrect lettre
                    result[i] = '_'
                }
            }
            
            }

        console.log("Try again :'(")
        console.log(result)
        }
        
    
    }
    
    word_comparison(test, test2)
    

});