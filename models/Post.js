const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    content: String,
    creatorId: { type: Schema.Types.ObjectId, ref: "User" },
    picPath: String,
    postName: String,
    comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: Number,
    likers: Array,
    genericRecipe: String,
  },
  { timestamps: true }
);
// postSchema.methods.addLike = function addLike () {
//   this.likes+=1;
// }

const Post = mongoose.model("Post", postSchema);
module.exports = Post;