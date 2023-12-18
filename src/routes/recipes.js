import express from "express";
import auth from "../middleware/auth.js";
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  GET_RECIPES,
  GET_RECIPE_AUTH,
  GET_RECIPE_BY_ID,
} from "../controllers/recipes.js";

const router = express.Router();

router.post("/recipes", auth, ADD_RECIPE);
router.get("/recipes/auth", auth, GET_RECIPE_AUTH);
router.get("/recipes", GET_RECIPES);

router.get("/recipes/:id", GET_RECIPE_BY_ID);
router.delete("/recipes/:id", auth, DELETE_RECIPE);

export default router;
