var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var CommentSchema = new Schema({

  body: String

});

// This creates our model from the above schema, using mongoose's model method
var Comment = mongoose.model("Comment", NoteSchema);

// Export the Note model
module.exports = Commentote;
