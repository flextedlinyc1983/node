var express = require('express');
var fs = require('fs');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});



var sql = require('mssql');
 
var config = {
    user: 'sa',
    password: '',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance 
    database: 'flaps',
    stream: true, // You can enable streaming globally 
 
    // options: {
    //     encrypt: true // Use this if you're on Windows Azure 
    // }
}



var mssql_demo_query = function (query_str) {

	

	sql.connect(config, function(err) {
	    // ... error checks 
	 
	    var request = new sql.Request();
	    request.stream = true; // You can set streaming differently for each request 
	    // request.query('select * from aa'); // or request.execute(procedure); 
	    request.query(query_str); // or request.execute(procedure); 
	 
	    request.on('recordset', function(columns) {
	    	// Emitted once for each recordset in a query 
	    	// console.log("columns: " + columns);
	    	console.log("name: " + columns.aa.name);
	
	    });
	 
	    request.on('row', function(row) {
	    	// Emitted for each row in a recordset 
	    	console.log("value: " + row.aa);
	    });
	 
	    request.on('error', function(err) {
	    	// May be emitted multiple times 
	    	console.log("err: " + err);
	    });
	 
	    request.on('done', function(affected) {
	    	// Always emitted as the last one 
	    	console.log("affected: " + affected);
	    });
	});
	 
	sql.on('error', function(err) {
	    // ... error handler 
	    console.log('err: ' + err);
	});	

	
}

 



var mssql_demo = {query: mssql_demo_query };
console.log(mssql_demo.query('select * from aa'))




var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.use( express.static( __dirname + '/public' ) );

app.use(function (req,res,next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});


app.use(function (req,res,next) {
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weather = {locations:[{name:'ted'},{name:'ted2'}]};
	next();
});


app.get('/about',function (req, res) {

	res.render('about',{fortune:"<p>abctest</p>"});
	// res.type('text/plain');

	// fs.readFile(__dirname + '/about.html', function (err, data) {
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 		res.send(data);	
	// 	}
		
	// });
	// res.send('about');
})

app.get('/demo',function (req, res) {

	res.render('demo',{fortune:"<p>demo</p>"});
	// res.type('text/plain');

	// fs.readFile(__dirname + '/about.html', function (err, data) {
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 		res.send(data);	
	// 	}
		
	// });
	// res.send('about');
})


app.set('port', 3000);
app.listen(app.get('port'), function () {
	console.log('Express started on http://localhost:' + app.get('port'));
});