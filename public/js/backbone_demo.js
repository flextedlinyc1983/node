$(document).ready(function () {
	$.ajaxSetup({ cache: false });
	console.log('hello')

	window.Wine = Backbone.Model.extend({
	    urlRoot:"../images",
	    defaults:function(){
	        return {
	            "id":test.nextOrder(),
	            "title":""
	        }
	    }
	});
	 

	window.WineCollection = Backbone.Collection.extend({
	    model:Wine,
	    url:"../images",
	    nextOrder: function() {
	      if (!this.length) return 1;
	      return this.last().get('id') + 1;
	    },
	});

	test = new window.WineCollection();
	

	
	var TodoView = Backbone.View.extend({
	    tagName: 'li',
	    className: 'ui-li-static ui-body-inherit',
	    // template: _.template($("#item-template").html()),
	    render: function() {
	        // console.log('TodoView');
	        // $(this.el).html(this.template(this.model.toJSON())); 
	        this.$el.html('<h1>' + this.model.id + '</h1>' + this.model.get('title'));
	        return this;
	    },
	    initialize: function () {
	        this.listenTo(this.model, 'change', this.render);
	        this.listenTo(this.model, 'destroy', this.remove);
	    },
		events:{
        	"click":"Clicked",
        },
        Clicked: function () {
        	// alert('clicked')
        	window.location = "about_detail/" + $(this.el).find('h1').text();
        }
	    // el: $('ul.indexPage')
	});   


	var TodoListView = Backbone.View.extend({
	    model: window.WineCollection,
	    el: $("#todoapp"),
	    render: function() {
	        // console.log('AppView');
	        this.$el.html(); // lets render this view
	        
	        var self = this;

	        // for(var i = 0; i < this.model.length; ++i) {
	        //     // lets create a book view to render
	        //     var m_bookView = new bookView({model: this.model.at(i)});

	        //     // lets add this book view to this list view
	        //     this.$el.append(m_bookView.$el); 
	        //     m_bookView.render(); // lets render the book           
	        // } 

	        _.each(this.model.models, this.renderTodos, this);

	         return this;
	    },
	    renderTodos:function (todo) {
	        $(this.el).prepend(new TodoView({model:todo}).render().el);
	    },
	    initialize: function () {
	        // this.listenTo(this.model, 'all', this.render);
	        this.listenTo(this.model, 'add', this.addOne);
	         // this.listenTo(this.model, 'reset', this.addAll);
	    },
	    addOne: function(todo) {
	      var view = new TodoView({model: todo});
	      $(this.el).prepend(view.render().el);


	    },
	    addAll: function() {
	      this.model.each(this.addOne, this);	
	      // $(this.el).listview("refresh");      
	    },
	});
	bookListView = new TodoListView({ model: test });
	test.fetch()


	var AddView = Backbone.View.extend({
    	// model: TodoList,
    	el: $("#addDiv"),
    	events:{
        	"click .addbutton":"submit",
        },
        submit:function () {
        	// alert($('#titleName').val());        	
        	test.create({title: $('#titleName').val(),type:"create"});
        	// return false;
        },
        submitSuccess:function () {
        	alert('submitSuccess');
        }
	});
	var addView = new AddView();




});