var     mongoose    = require("mongoose");

var blogpostSchema = new mongoose.Schema({
   name: String,
   image: String,
   body: String,
   created: 
         {type: Date, default: Date.now},
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("blogpost", blogpostSchema);