$(document).ready(function () {	
	console.log('getAllUsers.js')
	// $("#hrefBackBtn").on("vclick", function(e){
 //        e.preventDefault();
 //    	window.history.back();	
 //    }); 

	// var urlSplit = window.location.pathname.split('/');
	// var id = urlSplit[urlSplit.length-1];
	// $.ajax("ajax/" + id,{           
 //    }).done(function(result){
 //        console.log(result);

 //        if(!!result.message[0]){
 //        	// getAboutDetailView(result.message[0]);	

	// 		if(!!result.message[0].images){
	// 			getImageSlick(result.message[0].images);
	// 		}
        	
 //        }
        
 //    });

	// $.ajax("/goods",{           
 //    }).done(function(result){        

 //        if(!!result.message){
 //    		getGoodsView(result.message);        	
 //        }
        
 //    });

    




 //    var AboutDetailView = Backbone.View.extend({
 //    	model: Backbone.Model,
	//     // tagName: 'option',
	//     template: _.template($("#aboutDetail-template").html()),
	//     render: function() {
	//         // console.log('TodoView');
	//         // $(this.el).html(this.template(this.model.toJSON())); 
	//         // this.$el.html('<li>' + this.model.get('title') + '</li>');
	//         $(this.el).html(this.template(this.model.toJSON())); 
	//         return this;
	//     },
	//     initialize: function () {
	//         // this.listenTo(this.model, 'change', this.render);
	//         // this.listenTo(this.model, 'destroy', this.remove);
	//         // this.listenTo(this.model, 'add', this.addOne);
	//         this.render();
	//     },
	//     addOne: function(detail) {
 //      		$(this.el).html(this.template(detail.toJSON())); 
 //    	},

	//     // el: $('ul.indexPage')
	// });   

 //   	var getAboutDetailView = function (detail) {
 //   		var aboutDetailView = new AboutDetailView({model:new Backbone.Model(detail)});
	// 	$('[data-role=content]').append(aboutDetailView.el);
 //   	}

	




	


	// var Collections = function () {
	// 	var ImageList = Backbone.Collection.extend({
	// 	    model: Backbone.Model,		
	// 	});
	// 	var GoodList = Backbone.Collection.extend({
	// 	    model: Backbone.Model,		
	// 	});
	// 	return {
	// 		ImageList:ImageList,
	// 		GoodList:GoodList,
	// 	}

		
	// };

	// var collections = Collections();


	// var Views = function () {
	// 	var ImageListView = Backbone.View.extend({
	// 	    // model: ImageList,
	// 	    model: collections.ImageList,		    
	// 	    el: $(".demoslick"),
	// 	    render: function() {	
	// 	         return this;
	// 	    },		    
	// 	    initialize: function () {		      
	// 	        this.listenTo(this.model, 'add', this.addOne);		         
	// 	    },
	// 	    addOne: function(image) {
	// 	      var view = new ImageView({model: image});
	// 	      $(this.el).append(view.render().el);
	// 	    },		    
	// 	});
	// 	var ImageView = Backbone.View.extend({
	// 	    tagName: 'div',
	// 	    template: _.template($("#aboutDetail-image-template").html()),
	// 	    render: function() {		      
	// 	        $(this.el).html(this.template(this.model.toJSON())); 		        
	// 	        return this;
	// 	    },	
	// 	}); 


	// 	var GoodListView = Backbone.View.extend({
	// 	    // model: ImageList,
	// 	    model: collections.GoodList,		    
	// 	    el: $(".goodsList"),
	// 	    render: function() {	
	// 	         return this;
	// 	    },		    
	// 	    initialize: function () {		      
	// 	        this.listenTo(this.model, 'add', this.addOne);		         
	// 	    },
	// 	    addOne: function(good) {
	// 	      var view = new GoodView({model: good});
	// 	      $(this.el).find('ul').append(view.render().el);
	// 	    },		    
	// 	});

	// 	var GoodView = Backbone.View.extend({
	// 	    tagName: 'li',
	// 	    template: _.template($("#aboutDetail-good-template").html()),
	// 	    render: function() {		      
	// 	        $(this.el).html(this.template(this.model.toJSON())); 		        
	// 	        return this;
	// 	    },	
	// 	}); 

	// 	return {
	// 		ImageListView:ImageListView,
	// 		GoodListView:GoodListView,
	// 	}
	// }

	// var views = Views();


	// var getGoodsView = function (goods) {
 //   		var collectionFactory = new CollectionFactory();
	// 	var goodList = collectionFactory.createCollection({collectionType:"GoodListCollection",collectionClass:collections.GoodList});
	// 	// var imageListView = new ImageListView({model:imageList});
	// 	var viewFactory = new ViewFactory();
	// 	var imageListView = viewFactory.createView({viewType:"GoodListView",viewClass:views.GoodListView,model:goodList});
	// 	_.each(goods, function(good){
	// 		// console.log(good)	
	// 		if (good) {
	// 			good.price = numberWithCommas(good.price);
	// 			goodList.add(good);
	// 		}
			
	// 	}, this);
		
 //   	}
	// function numberWithCommas(x) {
	//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	// }

 //  	var getImageSlick = function (images) {
 //  		console.log(images);
 //   		// var aboutDetailView = new AboutDetailView({model:new Backbone.Model(detail)});
	// 	// $('[data-role=content]').html(aboutDetailView.el);
	// 	// var imageList = new ImageList();
	// 	var collectionFactory = new CollectionFactory();
	// 	var imageList = collectionFactory.createCollection({collectionType:"ImageListCollection",collectionClass:collections.ImageList});
	// 	// var imageListView = new ImageListView({model:imageList});
	// 	var viewFactory = new ViewFactory();
	// 	var imageListView = viewFactory.createView({viewType:"ImageListView",viewClass:views.ImageListView,model:imageList});

	// 	var urls = images.split(';');
	// 	_.each(urls, function(url){			
	// 		if (url) imageList.add({url:url});
	// 	}, this);


	// 	if (imageList.length){
	// 		$('.demoslick').slick({
	// 			infinite: true,
	// 			slidesToShow: 1,
		 
	// 			//slide animation direction and amount (if set -1 means slder animated from left to right) , the dot will disappear
	// 			// and you should set rtl = true ,too
	// 			slidesToScroll: 1,
		 
	// 	               // Enables auto play of slides
	// 			autoplay: true,
		 
	// 			// Auto play change interval
	// 			autoplaySpeed: 3000,
	// 			dots:false,
	// 			arrows:false,
	//         });
	// 	}


 //   	}


 //   	function ViewFactory() {}
		 
	// 	// Define the prototypes and utilities for this factory
		 
	// 	// Our default vehicleClass is Car
	// 	ViewFactory.prototype.viewClass = Backbone.View;
		 
	// 	// Our Factory method for creating new Vehicle instances
	// 	ViewFactory.prototype.createView = function ( options ) {
		 
	// 	  switch(options.viewType){
	// 	    case "ImageListView":
	// 	      this.viewClass = options.viewClass;
	// 	      break;
	// 	    case "GoodListView":
	// 	      this.viewClass = options.viewClass;
	// 	      break;
	// 	    //defaults to VehicleFactory.prototype.vehicleClass (Car)
	// 	  }
		 
	// 	 return new this.viewClass( {model:options.model} );
		 
	// };


 //   	function CollectionFactory() {}
		 
	// 	// Define the prototypes and utilities for this factory
		 
	// 	// Our default vehicleClass is Car
	// 	CollectionFactory.prototype.collectionClass = Backbone.Collection;
		 
	// 	// Our Factory method for creating new Vehicle instances
	// 	CollectionFactory.prototype.createCollection = function ( options ) {
		 
	// 	  switch(options.collectionType){
	// 	    case "ImageListCollection":
	// 	      this.collectionClass = options.collectionClass;
	// 	      break;
	// 	    case "truck":
	// 	      this.collectionClass = options.collectionClass;
	// 	      break;
	// 	    //defaults to VehicleFactory.prototype.vehicleClass (Car)
	// 	  }
		 
	// 	return new this.collectionClass();
		 
	// };


	var Events = {
		bind: function () {
			if(!this.o) this.o = $({});
			this.o.bind.apply(this.o, arguments);
		},
		trigger: function () {
			if(!this.o) this.o = $({});
			this.o.trigger.apply(this.o, arguments);
		},
	}
	var StateMachine = function () {};
	StateMachine.fn = StateMachine.prototype;
	$.extend(StateMachine.fn, Events);

	StateMachine.fn.add = function (controller) {
		this.bind("change", function (e, current) {
			if( controller == current){
				controller.activate();
			}else{
				controller.deactivate();
			}
		});

		controller.active = $.proxy(function () {
			this.trigger("change",controller);
		}, this);
	}

	var conMain = {
		activate: function () {
			$('[buttonname=Main]').addClass("controlgroupBtn-active");
			$('#mainContent').addClass("controlgroupContent-active");
		},
		deactivate: function () {
			$('[buttonname=Main]').removeClass("controlgroupBtn-active");
			$('#mainContent').removeClass("controlgroupContent-active");
		},
	};

	var conSecond = {
		activate: function () {
			$('[buttonname=Second]').addClass("controlgroupBtn-active");
			$('#secondContent').addClass("controlgroupContent-active");
		},
		deactivate: function () {
			$('[buttonname=Second]').removeClass("controlgroupBtn-active");
			$('#secondContent').removeClass("controlgroupContent-active");
		},
	};
	
	var sm = new StateMachine();
	sm.add(conMain);
	sm.add(conSecond);

	conMain.active();

	$('a[buttonname=Main]').on('vclick',function () {
		conMain.active();		
	})
	$('a[buttonname=Second]').on('vclick',function () {
		conSecond.active();		
	})

	/////////////////////////////////////////////////////////////////////////////////

	var scrollTopManager = {
		storeFooterContentScrollTop: function (index) {				
				this.ScrollTopNums[index] = $('body').scrollTop();
		},
		setFooterContentScrollTop: function (index) {
				$('body').scrollTop(this.ScrollTopNums[index] || 0);
		},

		ScrollTopNums: {},
	}

	/////////////////////////////////////////////////////////////////////////////////////

	var conFooter_1 = {
		activate: function () {
			$('[buttonname=footerHref_1]').addClass("footerHref-active");
			$('#footerContent_1').addClass("footerContent-active");

			scrollTopManager.setFooterContentScrollTop("footerContent_1");
		},
		deactivate: function () {
			scrollTopManager.storeFooterContentScrollTop("footerContent_1");
			
			$('[buttonname=footerHref_1]').removeClass("footerHref-active");
			$('#footerContent_1').removeClass("footerContent-active");	
		


			// $('body').scrollTop(0);			
			// setTimeout(function(){
			// 	$('[buttonname=footerHref_1]').removeClass("footerHref-active");
			// 	$('#footerContent_1').removeClass("footerContent-active");	
			// }, 150);   
	
		},
	};

	var conFooter_2 = {
		activate: function () {
			$('[buttonname=footerHref_2]').addClass("footerHref-active");
			$('#footerContent_2').addClass("footerContent-active");

			scrollTopManager.setFooterContentScrollTop("footerContent_2");
		},
		deactivate: function () {
			scrollTopManager.storeFooterContentScrollTop("footerContent_2");

			$('[buttonname=footerHref_2]').removeClass("footerHref-active");
			$('#footerContent_2').removeClass("footerContent-active");

			
		},
	};

	var smFooter = new StateMachine();
	smFooter.add(conFooter_1);
	smFooter.add(conFooter_2);

	conFooter_1.active();

	$('a[buttonname=footerHref_1]').on('vclick',function () {
		conFooter_1.active();		
	})
	$('a[buttonname=footerHref_2]').on('vclick',function () {
		conFooter_2.active();		
	})

	
});



function resetPageContent(){
	$("[data-url='/getAllUsers']").css({'padding-top':'106px'});
  	var contentMinHeight = $(window).height() - $('[data-role=page]').css('padding-top').replace(/[^-\d\.]/g, '') - $('[data-role=page]').css('padding-bottom').replace(/[^-\d\.]/g, '');  
 	$('[data-role=page]').css('min-height', contentMinHeight + 'px');
 	// alert($(window).height())
}