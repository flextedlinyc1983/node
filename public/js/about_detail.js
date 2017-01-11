$(document).ready(function () {
	$.ajaxSetup({ cache: false });
	console.log('hello')
	$("#hrefBackBtn").on("vclick", function(e){
        e.preventDefault();
    	window.history.back();	
    }); 

	var urlSplit = window.location.pathname.split('/');
	var id = urlSplit[urlSplit.length-1];
	$.ajax("ajax/" + id,{           
    }).done(function(result){
        console.log(result);
    });


});