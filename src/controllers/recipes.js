import recipeModel from "../models/recipes.js";

const ADD_RECIPE = async (req, res) => {
  try {
    const recipe = new recipeModel({
      date: new Date(),
      category: req.body.category,
      title: req.body.title,
      recipeAuthor: req.body.recipeAuthor,
      recipePhotoUrl: req.body.recipePhotoUrl,
      description: req.body.description,
      methodOfPreparation: req.body.methodOfPreparation,
      owner_id: req.body.userId,
      userName: req.body.fullName,
    });
    // console.log("Raw Request Body:", req.body);
    const response = await recipe.save();
    return res.status(200).json({ response });
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const GET_RECIPES = async (req, res) => {
  try {
    const recipes = await recipeModel.find();
    return res.status(200).json({ recipes });
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};
const GET_RECIPE_AUTH = async (req, res) => {
  try {
    const recipes = await recipeModel.find({
      owner_id: req.body.userId,
    });
    return res.status(200).json({ recipes });
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const GET_RECIPE_BY_ID = async (req, res) => {
  try {
    const recipe = await recipeModel.findOne({ _id: req.params.id });
    if (recipe) {
      return res.status(200).json({ recipe });
    } else {
      return res.status(404).json({ response: "Location not found" });
    }
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

const DELETE_RECIPE = async (req, res) => {
  try {
    const response = await recipeModel.deleteOne({ _id: req.params.id });
    return res.status(200).json({ response });
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(500).json({ response: "Something went wrong!" });
  }
};

export {
  ADD_RECIPE,
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  DELETE_RECIPE,
  GET_RECIPE_AUTH,
};
