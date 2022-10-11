$(document).ready(function(){

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
        var delayInMilliseconds = 500; //1 second




        boxes.forEach((node,i) => {
           setTimeout(() => {

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
            }, i*150)
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


    $('#gamePlace').submit(function( event ) {
        if (!win){
            var submit = $('#testWord').val().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            var test
            $.ajax({
                type: "POST",
                url: "test_word",
                data: {word : submit.toLowerCase()},
                success: function(result){
                    test = (JSON.parse(result).test)
                },
                async: false
            })

            if (test == "true"){
                update_table(submit)
                    $('#testWord').val('')
                    if (win == true){
                        alert('YOU WIN')
                        sessionStorage.setItem('score', (parseInt(sessionStorage.getItem('score')) + 1))
                        
                        $.ajax({
                            type: "POST",
                            url: "score",
                            data: {score : sessionStorage.getItem('score')},
                            success: function(data){
                            }
                        })
                    }
                }
            
            else{
                alert("Your word doesn't exist !")
            }
        }



        return false
    })



    target = init()
    generate_table()


})
