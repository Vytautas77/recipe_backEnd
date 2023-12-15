import express from "express";
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  GET_RECIPES,
  GET_RECIPE_BY_ID,
} from "../controllers/recipes.js";

const router = express.Router();

router.post("/recipes", ADD_RECIPE);
router.get("/recipes", GET_RECIPES);
router.get("/recipes/:id", GET_RECIPE_BY_ID);
router.delete("/recipes/:id", DELETE_RECIPE);

export default router;
