define(function (){
	var add = function (x,y){
    	return x+y;
    };
    

    var stateManager = {
 
	  fly: function () {
	 
	    var self = this;
	 
	    $( "#container" )
	          .unbind()
	          .on( "click", "div.toggle", function ( e ) {
	            self.handleClick( $(e.target) );
	          });
	  },
	 
	  handleClick: function ( elem ) {
		console.log('handleClick')
	    elem.find( "span" ).toggle( "slow" );
	  }
	};

	return {
    	add: add,
    	stateManager: stateManager
    };
});