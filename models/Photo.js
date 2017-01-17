var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/photo_app');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database Connected.");
});


var schema = new mongoose.Schema({
	name:String,
	path:String	
});

module.exports = mongoose.model('test123',schema);