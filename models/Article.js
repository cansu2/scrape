var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var ArticleSchema = new Schema({
 
  title: {
    type: String,
    required: true
  },

  summary: {
    type: String,
    required: true
  },

  news_link: {
    type: String,
    required: true
  },

  image_link: {
    type: String,
    required: true
  },
  
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;