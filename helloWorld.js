var http = require('http');
var fs = require('fs');

http.createServer(function (req,res) {

	

	// console.log(req.url);
	res.writeHead(200, {'Content-Type': 'text/plain'});
	// res.end('Hello World!');
	fs.readFile(__dirname + '/about.html', function (err, data) {
		if(err){
			console.log(err);
		}else{
			res.end(data);	
		}
		
	});

}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate...');