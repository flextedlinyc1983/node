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





app.set('port', 3000);
app.listen(app.get('port'), function () {
	console.log('Express started on http://localhost:' + app.get('port'));
});