var express = require('express');
var cookieParser = require('cookie-parser')
var router = express.Router();
var fs = require('fs');
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
var sql = require('mssql');
var formidable = require('formidable');
var util = require('util');
var sql = require('mssql');

var Photo = require('./models/Photo');
 
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


var mssql_create_table = function (table) {

	var table = new sql.Table(table); // or temporary table, e.g. #temptable 
	table.create = true;
	table.columns.add('ID', sql.Int, {nullable: false, primary: true});
	table.columns.add('stateCode', sql.VarChar(50), {nullable: false});
	table.rows.add(3, 'test');
	table.rows.add(4, 'test');
	table.rows.add(5, 'test');
	 

	sql.connect(config, function(err) { 
		var request = new sql.Request();
		request.bulk(table, function(err, rowCount) {
		    // ... error checks 
		});

	});

	
}



var demo_csv = function (id) {
	
// csvtojson modules 宣告
var Converter = require("csvtojson").Converter;
var newConverter = new Converter({});

// csv 檔案位置/名稱，先存在變數中只是為了方便看 code.
var csvfile = 'FL_insurance_sample_' + id + '.csv'

// JSON 檔案儲存名稱
var saveFileName = 'csvtojsonFL_insurance_sample_' + id + '.json';

// read from file 
// 利用 fs 讀取 csv 檔案並交給 csvtojson 解析
fs.createReadStream( csvfile ).pipe( newConverter );

// end_parsed will be emitted once parsing finished 
// 當 csvtojson 結束解析的時候
newConverter.on("end_parsed", function (jsonArray) {
  // 可開啟這行在 Command Line 觀看 data 內容
  // console.log(jsonArray); //here is your result jsonarray 
  // 對 jsonArray 做處理，寫你的 code
  // 儲存成 JSON
  // fs.writeFile 使用 File System 的 writeFile 方法做儲存
  // 傳入三個參數（ 存檔名, 資料, 格式 ）
  // fs.writeFile( saveFileName, JSON.stringify( jsonArray ), 'utf8');
  console.log('csv to JSON done !!');
  // return JSON.stringify( jsonArray );
});

	
}




var mssql_demo = {query: mssql_demo_query };
// console.log(mssql_demo.query('select * from aa'))




var app = express();
app.use(cookieParser());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


app.get('/responsivepage', function (req, res){
    res.sendFile(__dirname + '/public/responsivepage.html');
});

app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
});


app.post('/', function (req, res){
    var form = new formidable.IncomingForm();

    // form.parse(req);
    form.parse(req, function(err, fields, files) {
      // res.writeHead(200, {'content-type': 'text/plain'});
      // res.write('received upload:\n\n');
      // res.end(util.inspect({fields: fields, files: files}));
      console.log(util.inspect({fields: fields, files: files}));
    });

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
  //       var new_location = __dirname + '/uploads/' + file.name;
		// var temp_path = file.path;

  //       fs.copy(temp_path, new_location, function(err) {  
  //           if (err) {
  //                console.error(err);
  //           } else {
  //                console.log("success!")
  //           }
  //       });
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.sendFile(__dirname + '/index.html');
});




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

app.get('/demo_csv',function (req, res) {




	// res.type('text/plain');

	// fs.readFile(__dirname + '/about.html', function (err, data) {
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 		res.send(data);	
	// 	}
		
	// });
	// res.send('about');

	var id = req.query.id;
	demo_csv(id);
	var json = [{"policyID":119736,"statecode":"FL","county":"CLAY COUNTY","eq_site_limit":498960,"hu_site_limit":498960,"fl_site_limit":498960,"fr_site_limit":498960,"tiv_2011":498960,"tiv_2012":792148.9,"eq_site_deductible":0,"hu_site_deductible":9979.2,"fl_site_deductible":0,"fr_site_deductible":0,"point_latitude":30.102261,"point_longitude":-81.711777,"line":"Residential","construction":"Masonry","point_granularity":1},{"policyID":448094,"statecode":"FL","county":"CLAY COUNTY","eq_site_limit":1322376.3,"hu_site_limit":1322376.3,"fl_site_limit":1322376.3,"fr_site_limit":1322376.3,"tiv_2011":1322376.3,"tiv_2012":1438163.57,"eq_site_deductible":0,"hu_site_deductible":0,"fl_site_deductible":0,"fr_site_deductible":0,"point_latitude":30.063936,"point_longitude":-81.707664,"line":"Residential","construction":"Masonry","point_granularity":3}];
	res.render('demo_csv',{fortune:"<p>demo_csv111</p>", json:json});
	// console.log(json)
})

app.get('/about_detail/:id?',function (req, res) {

	console.log(req.params.id);
	sql.connect("mssql://sa:@localhost/test").then(function() {
		// Query     
	    new sql.Request().query('select * from about_detail where id=' + req.params.id).then(function(recordset) {
	        // console.log(recordset);
	        // gtitle = recordset.Properties.Item("title");
	        // console.log(recordset[0][0].value);
	        // console.log(recordset.length);
	        // console.log(recordset[0][0]);
	        gAbout_detail = recordset;
	        console.log(recordset);
	    }).catch(function(err) {
	        // ... query error checks 
	    });	    

	    new sql.Request().query('select * from Goods').then(function(recordset) {
	        // console.log(recordset);
	        // gtitle = recordset.Properties.Item("title");
	        // console.log(recordset[0][0].value);
	        // console.log(recordset.length);
	        // console.log(recordset[0][0]);
	        gGoods = recordset;
	        console.log(recordset);
	    }).catch(function(err) {
	        // ... query error checks 
	    });

	}).catch(function(err) {
	    // ... connect error checks 
	});

	res.render('about_detail',{fortune:"<p>abctest</p>"});
	
	
	
})

app.get('/about_detail/ajax/:a?',function (req, res) {

	var x = '';
 
	

	// res.render('sqltest',{fortune:"<p>mssql</p>" + x});

	res.json({ message: gAbout_detail });
	// console.log('sqltest\n');
	// console.log('sqltest\n');
	// console.log('regisID: "' + req.params.a + '"');
});

app.get('/goods',function (req, res) {

	var x = '';
 
	

	// res.render('sqltest',{fortune:"<p>mssql</p>" + x});

	res.json({ message: gGoods });
	// console.log('sqltest\n');
	// console.log('sqltest\n');
	// console.log('regisID: "' + req.params.a + '"');
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
	
	console.log('about\n');
})

app.get('/testpubsub',function (req, res) {



	res.render('testpubsub',{fortune:"<p>abctest</p>"});
	// res.type('text/plain');

	// fs.readFile(__dirname + '/about.html', function (err, data) {
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 		res.send(data);	
	// 	}
		
	// });
	// res.send('about');
	
	console.log('testpubsub\n');
})

app.get('/testrequire',function (req, res) {

	res.cookie('cookiename', 'cookievalue', { maxAge: 900000, httpOnly: true });

	// res.render('testrequire',{fortune:"<p>abctest</p>"});
	// res.type('text/plain');

	// fs.readFile(__dirname + '/about.html', function (err, data) {
	// 	if(err){
	// 		console.log(err);
	// 	}else{
	// 		res.send(data);	
	// 	}
		
	// });
	// res.send('about');
	
	console.log('testrequire\n');


	Photo.create({name:"belle",path:"/home/belle"},function (err) {
		console.log('create err: ' + err);
	})


	Photo.find({},function (err,photos) {
		console.log('photos: ' + photos);
		console.log('err: ' + err);
		res.render('testrequire',{fortune:"<p>abctest</p>",photos:photos});
	})
})


app.get('/api/test123',function (req, res) {

	Photo.find({},function (err,photos) {
		console.log('photos: ' + photos);
		console.log('err: ' + err);
		res.render('testrequire',{fortune:"<p>abctest</p>",photos:photos});
		res.json({ message: "ok!",photos:photos });
	})

	
	// console.log('sqltest\n');
	// console.log('sqltest\n');
	// console.log('regisID: "' + req.params.a + '"');
});

app.get('/api/test123',function (req, res) {

	Photo.find({},function (err,photos) {
		console.log('photos: ' + photos);
		console.log('err: ' + err);
		res.render('testrequire',{fortune:"<p>abctest</p>",photos:photos});
		res.json({ message: "ok!",photos:photos });
	})

	
	// console.log('sqltest\n');
	// console.log('sqltest\n');
	// console.log('regisID: "' + req.params.a + '"');
});

var bodyParser = require('body-parser')
// parse application/json
app.use(bodyParser.json())

app.delete('/api/test123/:_id',function (req, res) {
	// console.log('body: ' + req.body);
	console.log('body: ' + req.body);
	// res.json({ message: "ok!",body:req.body });
	var query = {'_id':req.url.split('/')[3]};
	Photo.findOneAndRemove(query, function(err, doc){
    	if (err) return res.send(500, { error: err });
    	return res.json({ message: "ok!",body:req.body });
	});

	// Photo.find({},function (err,photos) {
	// 	console.log('photos: ' + photos);
	// 	console.log('err: ' + err);
	// 	res.render('testrequire',{fortune:"<p>abctest</p>",photos:photos});
	// 	res.json({ message: "ok!",photos:photos });
	// })

	
	// console.log('sqltest\n');
	// console.log('sqltest\n');
	// console.log('regisID: "' + req.params.a + '"');
});

var api = require('./routes/api');
app.use('/api',api.auth);




app.put('/api/test123/:_id',function (req, res) {
	// console.log('body: ' + req.body);
	console.log('body: ' + req.body);
	// res.json({ message: "ok!",body:req.body });
	var query = {'_id':req.body._id};
	Photo.findOneAndUpdate(query, {path:req.body.path}, {upsert:true}, function(err, doc){
    	if (err) return res.send(500, { error: err });
    	return res.json({ message: "ok!",body:req.body });
	});

	// Photo.find({},function (err,photos) {
	// 	console.log('photos: ' + photos);
	// 	console.log('err: ' + err);
	// 	res.render('testrequire',{fortune:"<p>abctest</p>",photos:photos});
	// 	res.json({ message: "ok!",photos:photos });
	// })

	
	// console.log('sqltest\n');
	// console.log('sqltest\n');
	// console.log('regisID: "' + req.params.a + '"');
});

app.get('/sqltest/:a?',function (req, res) {

	var x = '';
 
	sql.connect("mssql://sa:@localhost/flaps").then(function() {
		// Query     
	    new sql.Request().query('select * from AAA').then(function(recordset) {
	        console.dir(recordset);
	        x = recordset.Properties.Item("Name");
	    }).catch(function(err) {
	        // ... query error checks 
	    });	    
	}).catch(function(err) {
	    // ... connect error checks 
	});

	res.render('sqltest',{fortune:"<p>mssql</p>" + x});

	
	console.log('sqltest\n');
	console.log('sqltest\n');
	console.log('regisID: "' + req.params.a + '"');
})

app.get('/demo',function (req, res) {

	var table = req.query.table;

	mssql_demo.query('select * from ' + table);

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

app.get('/demo_create_table',function (req, res) {

	var table = req.query.table;

	mssql_create_table(table);

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

app.disable('etag');
app.get('/images', function(req, res) {
    res.json(gMessage);
});



app.put('/images/:id?', function(req, res) {
    // res.json({        
    //     message: 'The put api for image: ' + req.params.id
    // })

    sql.connect("mssql://sa:@localhost/test").then(function() {
		// Query     

		console.log(req.body);
		
		if(req.body.type == 'create'){
console.log(req.body.id);
console.log(req.body.title);
console.log('create');
		    new sql.Request().query("insert into Todos (id,title) values (" + req.body.id + ",'" + req.body.title.toString() + "') ").then(function(recordset) {
		        // console.log(recordset);
		        // gtitle = recordset.Properties.Item("title");
		        // console.log(recordset[0][0].value);
		        // console.log(recordset.length);
		        // console.log(recordset[0][0]);
		        // gMessage = recordset;
		    }).catch(function(err) {
			        // ... query error checks 
			        console.log(err)
			});	    

		}
		else{
console.log('update');
			new sql.Request().query("update Todos set title = " + req.body.title + " WHERE id = " + req.params.id).then(function(recordset) {
		        // console.log(recordset);
		        // gtitle = recordset.Properties.Item("title");
		        // console.log(recordset[0][0].value);
		        // console.log(recordset.length);
		        // console.log(recordset[0][0]);
		        // gMessage = recordset;
		    }).catch(function(err) {
		        // ... query error checks 

		    });

		}
	    	    
	}).catch(function(err) {
	    // ... connect error checks 
	});
	res.json({ message: "update ok!" });
})

app.delete('/images/:id?', function(req, res) {
     // res.json({        
    //     message: 'The put api for image: ' + req.params.id
    // })

    sql.connect("mssql://sa:@localhost/test").then(function() {
		// Query     

		console.log(req.body);
		
		
	    new sql.Request().query("DELETE FROM Todos WHERE id = " + req.params.id).then(function(recordset) {
	        // console.log(recordset);
	        // gtitle = recordset.Properties.Item("title");
	        // console.log(recordset[0][0].value);
	        // console.log(recordset.length);
	        // console.log(recordset[0][0]);
	        // gMessage = recordset;
	    }).catch(function(err) {
	        // ... query error checks 

	    });	    
	}).catch(function(err) {
	    // ... connect error checks 
	});
	res.json({ message: "delete ok!" });
});
app.post('/images', function(req, res) {
    // res.json({        
    //     message: 'The put api for image: ' + req.params.id
    // })
console.log(req.params.id);
console.log(req.params.title);
    sql.connect("mssql://sa:@localhost/test").then(function() {
		// Query     
	    new sql.Request().query("insert into test.dbo.Todos (id,title) values (" + req.params.id + "," + req.params.title + ") ").then(function(recordset) {
	        // console.log(recordset);
	        // gtitle = recordset.Properties.Item("title");
	        // console.log(recordset[0][0].value);
	        // console.log(recordset.length);
	        // console.log(recordset[0][0]);
	        // gMessage = recordset;
	    }).catch(function(err) {
	        // ... query error checks 
	    });	    
	}).catch(function(err) {
	    // ... connect error checks 
	});
	res.json({ message: "post ok!" });
})

app.get('/sqltodos?',function (req, res) {

	var x = '';
 
	sql.connect("mssql://sa:@localhost/test").then(function() {
		// Query     
	    new sql.Request().query('select * from Todos order by id').then(function(recordset) {
	        // console.log(recordset);
	        // gtitle = recordset.Properties.Item("title");
	        // console.log(recordset[0][0].value);
	        // console.log(recordset.length);
	        // console.log(recordset[0][0]);
	        gMessage = recordset;
	    }).catch(function(err) {
	        // ... query error checks 
	    });	    
	}).catch(function(err) {
	    // ... connect error checks 
	});

	// res.render('sqltest',{fortune:"<p>mssql</p>" + x});

	res.json({ message: "ok!" });
	// console.log('sqltest\n');
	// console.log('sqltest\n');
	// console.log('regisID: "' + req.params.a + '"');
});

app.get('/:a?/:b?/:c?',function (req, res) {

	

	res.render('demo',{fortune:"<p>demo</p>" + req.params.a + req.params.b + req.params.c});
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
