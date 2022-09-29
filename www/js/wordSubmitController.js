$(document).ready(function(){


    //DEFINE AN AUTH/REDIRECT CLASS
    if (sessionStorage.getItem("username") == null){
        document.location.href="./html/login.html"
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
        });

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
                    var cellText = document.createTextNode(target[j])
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
           node.innerHTML = submit[k]
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

        if (comp == submit) win = true

        
    }

    function word_comparison(submit){
    
        var diff = ""
        target.toLowerCase()

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


    $('#gamePlace').submit(function( event ) {
        if (!win){
            var submit = $('#testWord').val().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            update_table(submit)
            $('#testWord').val('')
            if (win == true){
                alert('YOU WIN')
                sessionStorage.setItem('score', (parseInt(sessionStorage.getItem('score')) + 1))
                console.log("score = " + sessionStorage.getItem('score'))
                location.reload()
            }
        }

        return false
    });

    $('#logout').click(function(){
        sessionStorage.clear()
        document.location.href="/"
    })

    
    $("#scoreForm").submit(function(){
        $.post("http://localhost:3000/score",{score:sessionStorage.getItem('score')}, function(data){

          });
    })



    target = init()
    generate_table()


})
