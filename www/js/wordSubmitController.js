$(document).ready(function(){

    //DEFINE AN AUTH/REDIRECT CLASS
    if (sessionStorage.getItem("username") == null){
        $.ajax({
            type: "GET",
            url: "login",
            data: { },
            success: function(data){
                $('html').html(data);
            }
        })
    }

    var target
    var iterator = 1
    var win = false

    function init(){
        let word = ""

        $.ajax({
            url: '/get_mot',
            success: (result) =>{
                word = JSON.parse(result).word
            },
            async: false
        })

        document.getElementById('userdata').innerHTML = ("Player : " + sessionStorage.getItem("username"))
        document.getElementById('testWord').setAttribute('maxlength', word.length)
        document.getElementById('testWord').setAttribute('minlength', word.length)

        return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    }

    function generate_table(){
        var table = document.getElementById("tries")

        for (var i = 0; i < 6; i++) {

            var row = document.createElement("tr")
            row.setAttribute('id', ('row'+i))
            
            for (var j = 0; j <target.length ; j++) {

                var cell = document.createElement("td")
            if(i==0){
                if(j==0){
                    cell.setAttribute('id', ('col'+j))
                    var cellText = document.createTextNode(target[j].toUpperCase())
                }
                else{
                    cell.setAttribute('id', ('col'+j))
                    var cellText = document.createTextNode('.')
                }
                
            }
            else {
                var cellText = document.createTextNode(' ')
                cell.setAttribute('id', ('col'+j))
            }

            cell.appendChild(cellText);
            row.appendChild(cell)
            }

            table.appendChild(row)
        }

    }

    function update_table(submit){
        let id = ('row'+iterator)
        var boxes = document.getElementById(id).childNodes
        var comp = word_comparison(submit)
        let k = 0

        boxes.forEach((node) => {
           node.innerHTML = submit[k].toUpperCase()
           let color = 'green'
           
           if(comp[k]=='?'){
            color = 'orange'
            node.setAttribute("style", "background-radius: " + color + ";");
           }
           if(comp[k]=='_'){
            color = 'red'
           }

           node.setAttribute("style", "background-color: " + color + ";");
           k=k+1
        })

        iterator = iterator + 1

        if (comp.toLowerCase() == submit.toLowerCase()) win = true

        
    }

    function word_comparison(submit){
    
        var diff = ""
        target = target.toLowerCase()
        submit = submit.toLowerCase()

       for(i=0; i<target.length; i++) {
            if (target[i] == submit[i]){
                diff += target[i]
            }
            else{
                if (target.includes(submit[i])){
                    diff += "?"
                }
                else{
                    diff += "_"
                }
            }
        }
        return diff
    }

    // first test to see if the word is in the list

    // function isInWords(submit_word){
        
    //     var dict = false
    //     var {words} = require('../../index.js')
    //     if (words.includes(submit_word.toLowerCase())) {
    //         dict = false
    //     } else {
    //         dict = true
    //     }

    //     return dict
    // }


    $('#gamePlace').submit(function( event ) {

        var submit = $('#testWord').val().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

        // first test to see if the word is in the list
        // var dic = isInWords(submit)
        // var {words} = require('../../index.js')
        // if (words.includes(submit_word.toLowerCase())) {
            // alert("Le mot " + submit.toUpperCase() + " n'est pas dans le dico !")
        // } else {
            if (!win){
                update_table(submit)
                $('#testWord').val('')
                if (win == true){
                    alert('YOU WIN')
                    sessionStorage.setItem('score', (parseInt(sessionStorage.getItem('score')) + 1))
                    console.log("score = " + sessionStorage.getItem('score'))
                    // location.reload()
                }
            }
        // }


        return false
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

    
    $("#scoreForm").submit(function(){

        $.ajax({
            type: "POST",
            url: "score",
            data: {score:sessionStorage.getItem('score')},
            success: function(page){
                $('html').html(page)
            }
        })

        return false
    })



    target = init()
    generate_table()


})
