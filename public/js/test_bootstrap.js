function resetPageContent(){

}


$(document).ready(function () {	

$(".carousel").on("touchstart", function(event){
		var gNext = false;
		var gPrev = false;
        var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function(event){
        var xMove = event.originalEvent.touches[0].pageX;
        if( Math.floor(xClick - xMove) > 5 ){
            // $(".carousel").carousel('next');
            gNext = true;
        }
        else if( Math.floor(xClick - xMove) < -5 ){
            // $(".carousel").carousel('prev');
            gPrev = true;
        }
    });
    $(".carousel").on("touchend", function(){
            if(gNext){
            	// $(".carousel").carousel('next');
            	// $( "#test" ).trigger( "click" );
            	setTimeout(function () {
            		// $( "#test" ).trigger( "click" );
            		$(".carousel").carousel('next');
            	}, 10);
            	gNext = false;
            }
            if(gPrev){
            	// $(".carousel").carousel('prev');
            	// $( "#test2" ).trigger( "click" );
            	setTimeout(function () {
            		$(".carousel").carousel('prev');
            		// $( "#test2" ).trigger( "click" );
            	}, 10);
            	gPrev = false;
            }
            $(this).off("touchmove");
    });
    // $(".carousel").on("touchend", function(){
    //         $(this).off("touchmove");
    // });
});

$('#test').on('click', function () {
	$(".carousel").carousel('next');
})
$('#test2').on('click', function () {
	$(".carousel").carousel('prev');
})

});