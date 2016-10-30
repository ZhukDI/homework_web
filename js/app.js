"use strict"

var makeRequest;

$(document).ready(function() {
	$("#search").on("click", function(){
    	var platform = $("#platform").val();
    	var name = $("#name").val();
    	if((!platform)||(!name)){
    		throw new Error(alert("Fill the fields"));
    	}
    	var url = "https://libraries.io/api/" + platform + "/" + name + "/dependents?api_key=f0acdc5d900ec4f1655b9d71dda0937a";
    	makeRequest = function(){
    	var getJSON = function(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.onload = function() {
                var status = xhr.status;
                if (status == 200) {
                    resolve(xhr.response);
                } else {
                    reject(status);
                }
            };
            xhr.send();
        });
    };

    getJSON(url).then(function(data) {
    	var responseData = JSON.parse(data);
		console.log(responseData);
		var source = $("#result-template").html();
		var template = Handlebars.compile(source);
		$('#result').empty();
		$('#result').append(template(responseData));
    }, function(status) {
        alert('Error: ' + status);
    });
    }
    makeRequest();
    setInterval(makeRequest, 30000);
    });
});
