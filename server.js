var express = require("express");
var bodyParser = require("body-parser");

var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");


var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

var databaseUrl = 'mongodb://localhost/week18day3mongoose'

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
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

app.get("/", function(req, res) {
    res.send("Hello world");
  });
  
  // app.get("/scrape", function(req, res) {
  //   request("https://www.chowhound.com/food-news/latest/", function(error, response, html) {
  
  //       // Load the HTML into cheerio and save it to a variable
  //       // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  //       var $ = cheerio.load(html);
      
  //       $(".post").each(function(i, element) {
      
  //         var title = $(element).find("h3").text();
  //         var summary = $(element).find("p").text();
         
  //         var news_link = $(element).find(".more-link").attr("href");
  //         var image_link =  $(element).find("img").attr("src");
              
  //         db.scraperData.insert({title: title, summary: summary, news_link: news_link, image_link:image_link});
  
  //       });
  
  //       db.scraperData.find({}, function(err, data) {
  //         // Log any errors if the server encounters one
  //           if (err) {
  //             console.log(err);
  //           }
  //           // Otherwise, send the result of this query to the browser
  //           else {
  //             res.json(data);
        
  //       }
  //       res.end(data);
  //   });
    
  
  //     });
        
  // });
  
  
  // // Listen on port 3000
  // app.listen(3000, function() {
  //   console.log("App running on port 3000!");
  // });
 