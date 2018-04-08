// // Node Dependencies
// var express = require('express');
// var router = express.Router();
// var path = require('path');

var request = require('request'); // for web-scraping
var cheerio = require('cheerio'); // for web-scraping

// Import the Comment and Article models
var Comment = require('../models/Comment.js');
var Article = require('../models/Article.js');

// Index Page Render (first visit to the site)
module.exports = function(app){


    app.get('/', function (req, res){
        // Scrape data
        res.redirect('/scrape');

    });

    app.get("/scrape", function(req, res) {
        request("https://www.chowhound.com/food-news/latest/", function(error, response, html) {
    
            // Load the HTML into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(html);
        
            $(".post").each(function(i, element) {
        
            var title = $(element).find("h3").text();
            var summary = $(element).find("p").text();
            
            var news_link = $(element).find(".more-link").attr("href");
            var image_link =  $(element).find("img").attr("src");

            if (title && summary && news_link && image_link) {
                //destructering
                var result = { title, summary, news_link, image_link};

                Article.create(result, function(err, data) {
                    if (err){
                        console.log(err);
                    } else {
                        console.log(data);
                    };
                });
            };
            
            });
            
        });
        res.send("Scrape Complete");
        });


    app.get("/articles", function(req, res) {
        Article.find({}, function (err, data) {
            if (err) {
                console.log("dang something wrong")
            } else {
                res.render("index", {result: data});
            }
        })
        .sort({'_id': -1})
    });    

    app.get("/article/:id", function (req, res) {
        Article.findOne({"_id": req.params.id})
        .populate("comment")
        .exec(function (error, doc) {
            // Log any errors
            if (error) {
              console.log(error// Otherwise, send the doc to the browser as a json object
              );
            } else {
              res.render("comments", {result: doc});
              // res.json (doc);
        
            }
        });    
    });


  // Create a new comment
  app.post("/articles/:id", function (req, res) {
    // Create a new Comment and pass the req.body to the entry
    Comment.create(req.body, function (error, doc) {
       
        if (error) {
          console.log(error);
        } else {
          Article.findOneAndUpdate({
            "_id": req.params.id
          }, {
            $push: {
              "comment": doc._id
            }
          }, {
            safe: true,
            upsert: true,
            new: true
          })
          // Execute the above query
            .exec(function (err, doc) {
              // Log any errors
              if (err) {
                console.log(err);
              } else {
                // Or send the document to the browser
                res.redirect('back');
              }
            });
        }
      });
  });

  // app.delete("/articles/:id/:commentid", function (req, res) {
  //   Comment.findByIdAndRemove(req.params.commentid, function (error, doc) {
  //       // Log any errors
  //       if (error) {
  //         console.log(error// Otherwise
  //         );
  //       } else {
  //         console.log(doc);
  //         Article.findOneAndUpdate({
  //           "_id": req.params.id
  //         }, {
  //           $pull: {
  //             "comment": doc._id
  //           }
  //         })
  //         // Execute the above query
  //           .exec(function (err, doc) {
  //             // Log any errors
  //             if (err) {
  //               console.log(err);
  //             }
  //           });
  //       }
  //     });
  // });
}