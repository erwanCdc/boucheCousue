$(document).ready(function(){

    $.ajax({
        type: "POST",
        url: "http://localhost:3001/init_user",
        data: {username: sessionStorage.getItem("username")},
        success: function(result){
            
        }
    })

    var target
    var iterator = 1
    var win = false

    //strings are immutables in JavaScript. This function allows us to change a character in a string
    String.prototype.replaceAt = function(index, replacement) {
        if (index >= this.length) {
            return this.valueOf();
        }
     
        return this.substring(0, index) + replacement + this.substring(index + 1);
    }

    //this function is called when a user accessed the game page : 
    //it makes an ajax request to get the word of the day and define the HTML input size 
    //(so it's mandatory for the user to print a word with the same size)
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

    //this function generate the HTML table containing user's resposnes
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

    /**
     * this function update the HTML table after one try from the user 
     * as the true motus game, the box become : 
     *              1. green if the letter is at the right position
     *              2. orange if the letter exists but isn't at the right place
     *              3. red else
     */
    
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

    /**
     * 
     * this function compare the submited word with the word of the day
     * then, it returns a comparison string
     */
    function word_comparison(submit){
    
        var diff = ""
        target = target.toLowerCase()
        submit = submit.toLowerCase()

        var tmp = target

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

        for (i=0; i<target.length; i++) {
            if (diff[i] != "?" && diff[i] != "_"){
                tmp = tmp.replace(tmp[i], "!")
            }
        }

        for (i=0; i<target.length; i++) {
            if (diff[i] == "?"){
                if (tmp.includes(submit[i])) {
                    tmp = tmp.replace(tmp[tmp.indexOf(submit[i])], "!")
                } else {
                    diff = diff.replaceAt(i, "_")
                }
            }
        }
        
        return diff
    }


    /**
     * this process is called when a user submit a word
     * if the word exists in our server dictionnary, then it will do the comparison between the submited word and the word of the day and update table view
     * 
     */
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
                    if (win == true){
                        alert('YOU WIN')
                        
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:3001/update_score",
                            data: {user : sessionStorage.getItem('username'),
                                    nb_try: (iterator-1), win:1},
                            success: function(page){
                                $('#page').html(page);
                            }
                        })

                    }
                }
            
            else{
                alert("Your word doesn't exist !")
            }

            $('#testWord').val('')
        }

        if (iterator == 6){
            alert("You lose!")
            
            $.ajax({
                type: "POST",
                url: "http://localhost:3001/update_score",
                data: {user : sessionStorage.getItem('username'),
                        nb_try: 0, win:0},
                success: function(page){
                    $('#page').html(page);
                }
            })
        }

        return false
    })


    target = init()
    generate_table()


})
