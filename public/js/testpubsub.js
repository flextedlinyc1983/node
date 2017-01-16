$(document).ready(function () {
	$.ajaxSetup({ cache: false });
	console.log('hello');
	var db = openDatabase("ratings", "", "Backbone-websql example", 1024*1024);	
	var Collections = function () {
		var RatingList = Backbone.Collection.extend({
		    // model: Backbone.Model,	
		    model: Connect,	
		    // store: new WebSQLStore(db, "ratings"),
		    // store: "",
		    localStorage: new Backbone.LocalStorage('ratings-backbone'),
		    getMaxId: function () {
			  	var max = 0;
				this.each(function(model){
					if(model.id > max){
						max = model.id;
				   }
				});
				return max;
			},
			
		});	
		TestList = Backbone.Collection.extend({
		    // model: Backbone.Model,	
		    // model: Connect,	
		    store: new WebSQLStore(db, "tests"),
		    // store: "",
		    // localStorage: new Backbone.LocalStorage('ratings-backbone'),		    
		});		
		return {
			RatingList:RatingList,	
			TestList,TestList,		
		}

		
	};

	Connect = Backbone.Model.extend({		
		idAttribute: "connectId",	
	});


	var collections = Collections();

	testList = new TestList();

	var Views = function () {
		var RatingView = Backbone.View.extend({
		    // model: ImageList,
		    model: collections.RatingList,		    
		    el: $("#container"),
		    render: function() {	
		         return this;
		    },		    
		    initialize: function () {		      
		        this.listenTo(this.model, 'add', this.addOne);		         
		    },
		    addOne: function(item) {
		      var view = new RatingItemView({model: item});
		      $(this.el).find("#ratings").append(view.render().$el.html());
		    },	
		    events: {
      			"vclick #add": "addFunc",
    		},
    		addFunc: function (e) {
    			e.preventDefault();
    			console.log('addFunc');

    			//   var strUser = $("#twitter_handle").val(),
	  			//      strMovie = $("#movie_seen").val(),
	  			//      strRating = $("#movie_rating").val();
	  			var strUser = $(this.el).find("#twitter_handle").val(),
	  			     strMovie = $(this.el).find("#movie_seen").val(),
	  			     strRating = $(this.el).find("#movie_rating").val();

	  			// Inform the application a new user is available
	    		$.publish( "/new/user", { name: strUser} );
	 
	    		// Inform the app a new rating is available
	    		$.publish( "/new/rating", { title: strMovie, rating: strRating, elID: "add"} );
    		},	    
		});
		var RatingItemView = Backbone.View.extend({
		    tagName: 'div',
		    template: _.template($("#ratingsTemplate").html()),
		    render: function() {		      
		        $(this.el).html(this.template(this.model.toJSON())); 		        
		        return this;
		    },	
		}); 


		

		return {
			RatingView:RatingView,		
		}
	}

	var views = Views();
	
	var getRatingView = function () {
   		var collectionFactory = new CollectionFactory();
		var ratingList = collectionFactory.createCollection({collectionType:"RatingCollection",collectionClass:collections.RatingList});
		// var imageListView = new ImageListView({model:imageList});
		var viewFactory = new ViewFactory();
		var ratingListView = viewFactory.createView({viewType:"RatingView",viewClass:views.RatingView,model:ratingList});
		
		return ratingListView;
   	}
	
	function ViewFactory() {}
		 
		// Define the prototypes and utilities for this factory
		 
		// Our default vehicleClass is Car
		ViewFactory.prototype.viewClass = Backbone.View;
		 
		// Our Factory method for creating new Vehicle instances
		ViewFactory.prototype.createView = function ( options ) {
		 
		  switch(options.viewType){
		    case "RatingView":
		      this.viewClass = options.viewClass;
		      break;
		    case "GoodListView":
		      this.viewClass = options.viewClass;
		      break;
		    //defaults to VehicleFactory.prototype.vehicleClass (Car)
		  }
		 
		 return new this.viewClass( {model:options.model} );
		 
	};


   	function CollectionFactory() {}
		 
		// Define the prototypes and utilities for this factory
		 
		// Our default vehicleClass is Car
		CollectionFactory.prototype.collectionClass = Backbone.Collection;
		 
		// Our Factory method for creating new Vehicle instances
		CollectionFactory.prototype.createCollection = function ( options ) {
		 
		  switch(options.collectionType){
		    case "RatingCollection":
		      this.collectionClass = options.collectionClass;
		      break;
		    case "truck":
		      this.collectionClass = options.collectionClass;
		      break;
		    //defaults to VehicleFactory.prototype.vehicleClass (Car)
		  }
		 
		return new this.collectionClass();
		 
	};


	
	 
	(function(myObject) {
	 
	    // Storage for topics that can be broadcast
	    // or listened to
	    var topics = {};
	 
	    // An topic identifier
	    var subUid = -1;
	 
	    // Publish or broadcast events of interest
	    // with a specific topic name and arguments
	    // such as the data to pass along
	    myObject.publish = function( topic, args ) {
	 
	        if ( !topics[topic] ) {
	            return false;
	        }
	 
	        var subscribers = topics[topic],
	            len = subscribers ? subscribers.length : 0;
	 
	        while (len--) {
	            subscribers[len].func( topic, args );
	        }
	 
	        return this;
	    };
	 
	    // Subscribe to events of interest
	    // with a specific topic name and a
	    // callback function, to be executed
	    // when the topic/event is observed
	    myObject.subscribe = function( topic, func ) {
	 
	        if (!topics[topic]) {
	            topics[topic] = [];
	        }
	 
	        var token = ( ++subUid ).toString();
	        topics[topic].push({
	            token: token,
	            func: func
	        });
	        return token;
	    };
	 
	    // Unsubscribe from a specific
	    // topic, based on a tokenized reference
	    // to the subscription
	    myObject.unsubscribe = function( token ) {
	        for ( var m in topics ) {
	            if ( topics[m] ) {
	                for ( var i = 0, j = topics[m].length; i < j; i++ ) {
	                    if ( topics[m][i].token === token ) {
	                        topics[m].splice( i, 1 );
	                        return token;
	                    }
	                }
	            }
	        }
	        return this;
	    };
	}( $ ));





	(function( $ ) {
	 
	  // Pre-compile templates and "cache" them using closure
	  var userTemplate = _.template($( "#userTemplate" ).html()),
	  ratingsTemplate = _.template($( "#ratingsTemplate" ).html());
	 
	  // Subscribe to the new user topic, which adds a user
	  // to a list of users who have submitted reviews
	  $.subscribe( "/new/user", function( e, data ){
	 
	    if( data ){
	 
	      $('#users').append( userTemplate( data ));
	 
	    }
	 
	  });
	 
	  // Subscribe to the new rating topic. This is composed of a title and
	  // rating. New ratings are appended to a running list of added user
	  // ratings.
	  $.subscribe( "/new/rating", function( e, data ){
	 
	    if( data.elID ){	
	    	if(ratingListView.model.localStorage)
			{
				ratingListView.model.create({ title: data.title, rating: data.rating,connectId: ratingListView.model.getMaxId() + 1});      	 	
			}else if(ratingListView.model.store){
				ratingListView.model.create({ title: data.title, rating: data.rating});      	 	
			}
	 		
	    }
	 
	  });
	 
	  // Handler for adding a new user
	  // $("#add").on("click", function( e ) {
	 
	  //   e.preventDefault();
	 
	  //   var strUser = $("#twitter_handle").val(),
	  //      strMovie = $("#movie_seen").val(),
	  //      strRating = $("#movie_rating").val();
	 
	  //   // Inform the application a new user is available
	  //   $.publish( "/new/user", { name: strUser } );
	 
	  //   // Inform the app a new rating is available
	  //   $.publish( "/new/rating", { title: strMovie, rating: strRating} );
	 
	  //   });
	 
	})( $ );


	ratingListView = getRatingView();        	

});