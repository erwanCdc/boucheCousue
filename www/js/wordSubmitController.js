$(document).ready(function(){
    $('#gamePlace').submit(function() {
	    var wordAttempt = $("#testWord")[0].value

	    $.ajax({
		    type: "POST",
		    url: "/",
		    data: wordAttempt,
	    })

	    return false
    })

    var mot = $.get("/mot").responseText
})
