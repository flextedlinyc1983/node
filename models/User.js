var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/photo_app');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database Connected. user");
});


var schema = new mongoose.Schema({
	name:String,
	address:String,
	addColumn:String,	
	authColumn:Boolean,
	imgColumn:String,
	hrefColumn:String,
});

module.exports = mongoose.model('users',schema);