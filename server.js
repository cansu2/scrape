var express = require("express");
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");

var logger = require("morgan");
var mongoose = require("mongoose");

//es6
mongoose.Promise = Promise;

var app = express();

var port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


// var mongodb_url = 'mongodb://cansu_cansu:uykusuz34@ds233739.mlab.com:33739/heroku_grspm2pb'
var databaseUrl = 'mongodb://localhost/scraperDB'

if (process.env.MONGODB_URI) {
  // mongoose.connect(process.env.MONGODB_URI);
  mongoose.connect(databaseUrl)
} else {
  mongoose.connect(databaseUrl)
}

var db = mongoose.connection;

db.on('error', function(err){
  console.log("Mongoose Error: ", err);
});

db.once('open', function() { 
  console.log('Mongoose connection successful.')
}); 


require('./controllers/controller.js')(app);


app.listen(port, function(){
  console.log('Running on port: ' + port);
});
  
 
 