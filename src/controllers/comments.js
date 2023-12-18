import CommentModel from "../models/comments.js";

const ADD_COMMENT = async (req, res) => {
  try {
    const comment = new CommentModel({
      commentText: req.body.commentText,
      date: new Date(),
      gainedLikesNumber: 1,
      recipeId: "id",
    });
    const response = await comment.save();
    return res.status(200).json({ response });
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

export { ADD_COMMENT, GET_COMMENTS, DELETE_COMMENT };
