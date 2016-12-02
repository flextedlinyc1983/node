var express = require('express');
var fs = require('fs');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});

var app = express();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

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


app.set('port', 3000);
app.listen(app.get('port'), function () {
	console.log('Express started on http://localhost:' + app.get('port'));
});