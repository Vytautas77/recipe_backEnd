import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  commentText: { type: String, required: true },
  date: { type: String, required: true },
  gainedLikesNumber: { type: Number, required: true },
  recipeId: { type: String },
  userName: { type: String, required: true },
});

export default mongoose.model("Comment", commentSchema);
