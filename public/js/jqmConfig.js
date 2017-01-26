$(document).on('mobileinit', function() {
	// alert('jqmConfig');


    $.mobile.activeBtnClass = 'unused';
//     $.mobile.ajaxEnabled = false;
//     $.mobile.linkBindingEnabled = false;
//     $.mobile.hashListeningEnabled = false;
//     $.mobile.pushStateEnabled = false;
    $.mobile.defaultPageTransition = "none";
//     // $.mobile.defaultPageTransition = "fade";
//     // $.mobile.defaultPageTransition = "slide";
//     // $.mobile.autoInitializePage = false;
// if(screen.availWidth >= 600){
// $.event.special.swipe.scrollSupressionThreshold = (screen.availWidth) / 60;
// $.event.special.swipe.horizontalDistanceThreshold = (screen.availWidth) / 60;
// $.event.special.swipe.verticalDistanceThreshold = (screen.availHeight) / 13;
// }
// 	// Remove page from DOM when it's being replaced
//     // $('div[data-role="page"]').on('pagehide', null, function (event, ui) {


// 	// $('div[data-role="page"]').on('pagecontainerhide', null, function (event, ui) {
//  //        $(event.currentTarget).remove();
//  //    });

//     // $(document).on('touchmove', ":jqmData(role='page')", function (event) {
//     //     if (!$('.scrollable').has($(event.target)).length) event.preventDefault();



//     // });


// 	$(document).on('pagehide', ":jqmData(role='page')", function (event, ui) {
//         // $(event.currentTarget).remove();
//         // prevent ios crash
//         var currentPage = $(event.currentTarget);
//         setTimeout(function () {
//             currentPage.remove();
//         },100);
//     });

//     $(document).on('pagebeforeshow', ":jqmData(role='page')", function (event, ui) {
//         // console.log('test')
//     });

//     $(document).on('pageshow', ":jqmData(role='page')", function (event, ui) {
//         // console.log('test')
//         setPageHeight();
//     });

// // $(document).bind('pagebeforeshow', function (event, data) {
// // 	var url = $.mobile.path.parseUrl(data.toPage).hash;
// // });

// // $(":mobile-pagecontainer").bind('pagebeforechange', function (event, data) {
// // 	var url = $.mobile.path.parseUrl(data.toPage).hash;
// // });

	$(document).on('pageshow', ":jqmData(role='page')", function (event, ui) {
        resetPageContent();
    });
	
	$(window).on( "throttledresize", function ( e ) {
	   	resetPageContent();
	});

	$(window).on('resize', function (event) {
		resetPageContent();
	});		
});

