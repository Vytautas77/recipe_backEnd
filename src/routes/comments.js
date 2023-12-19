import express from "express";
import auth from "../middleware/auth.js";
import {
  ADD_COMMENT_RECIPE_ID,
  DELETE_COMMENT,
  GET_COMMENTS,
} from "../controllers/comments.js";

const router = express.Router();

router.post("/comments/", auth, ADD_COMMENT_RECIPE_ID);
router.get("/comments", GET_COMMENTS);
router.delete("/comments/:id", auth, DELETE_COMMENT);

export default router;
