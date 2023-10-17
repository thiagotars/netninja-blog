const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

// mongoose model receive two arguments
// first argument is a name. this should be the singular of collection name declared on mongo database
// second argument is the blogSchema created above
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
