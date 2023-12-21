import CommentModel from "../models/comments.js";
import RecipeModel from "../models/recipes.js";

const ADD_COMMENT_RECIPE_ID = async (req, res) => {
  try {
    const comment = new CommentModel({
      commentText: req.body.commentText,
      date: new Date(),
      gainedLikesNumber: 0,
      userName: req.body.fullName,
    });
    const id = comment._id.toString();
    comment.recipeId = id;
    const response = await comment.save();

    await RecipeModel.updateOne(
      { _id: req.body.recipeId },
      { $push: { recipesComments: response._id } }
    );
    return res.status(201).json({ message: "Comment was added", response });
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};
const GET_COMMENTS = async (req, res) => {
  try {
    const comments = await CommentModel.find();
    return res.status(200).json({ comments });
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const DELETE_COMMENT = async (req, res) => {
  try {
    const comments = await CommentModel.deleteOne({ _id: req.params.id });
    return res.status(200).json({ comments });
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

export { ADD_COMMENT_RECIPE_ID, GET_COMMENTS, DELETE_COMMENT };
