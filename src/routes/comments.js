import express from "express";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS,
} from "../controllers/comments.js";

const router = express.Router();

router.post("/comments", ADD_COMMENT);
router.get("/comments", GET_COMMENTS);
router.delete("/comments/:id", DELETE_COMMENT);

export default router;
