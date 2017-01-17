require.config({
	paths: {
// 		"jquery": "jquery.min.js",
// 　　　　"underscore": "underscore.min.js",
// 　　　　"backbone": "backbone.min.js"
		"math":"require_test"
　　}
});

require(["math"], function(math) {
  console.log(math.add(1,1));  
  math.stateManager.fly();


	var topics = {};	 
	jQuery.Topic = function( id ) {
	    var callbacks,
	        topic = id && topics[ id ];
	    if ( !topic ) {
	        callbacks = jQuery.Callbacks();
	        topic = {
	            publish: callbacks.fire,
	            subscribe: callbacks.add,
	            unsubscribe: callbacks.remove
	        };
	        if ( id ) {
	            topics[ id ] = topic;
	        }
	    }
	    return topic;
	};
	var fn1 = function(val){
		console.log('fn1 ' + val )
	}
	var fn2 = function(val){
		console.log('fn2 ' + val )
	}
	$.Topic( "mailArrived" ).subscribe( fn1 );
	$.Topic( "mailArrived" ).subscribe( fn2 );
	$.Topic( "mailArrived" ).publish( "hello world!" );


	$(document).ready(function () {


		$.fn.tabs = function (control) {
			var el = $(this);
			control = $(control);

			el.on('click','li',function () {
				var tabName = $(this).attr("data-tab");
				el.trigger("change.tabs",tabName);
			})

			el.on("change.tabs",function (e,tabName) {
				el.find('li').removeClass("active");
				el.find(">[data-tab='" + tabName + "']").addClass('active');
			})
			el.on("change.tabs",function (e,tabName) {
				control.find('>[data-tab]').removeClass("active");
				control.find(">[data-tab='" + tabName + "']").addClass('active');
			})


			var firstName = el.find('li:first').attr('data-tab');
			el.trigger("change.tabs",firstName);

			return this;
		}

		$("ul#tabs").tabs("#tabsContent");

	})



});