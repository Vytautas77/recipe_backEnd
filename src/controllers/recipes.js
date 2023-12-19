import recipeModel from "../models/recipes.js";
import { response } from "express";
import { Schema, Types, connect } from "mongoose";

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
      recipesComments: [],
    });
    const response = await recipe.save();
    return res.status(201).json({ message: "Recipe was added", response });
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
const GET_RECIPE_BY_ID_WITH_COMMENT = async (req, res) => {
  try {
    const recipeResponse = await recipeModel
      .aggregate([
        {
          $match: { _id: new Types.ObjectId(req.params.id) },
        },
        {
          $lookup: {
            from: "comments",
            localField: "recipesComments",
            foreignField: "_id",
            as: "recipesComments",
          },
        },
        {
          $unwind: {
            path: "$recipe_comments",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            category: { $first: "$category" },
            date: { $first: "$date" },
            title: { $first: "$title" },
            recipeAuthor: { $first: "$recipeAuthor" },
            recipePhotoUrl: { $first: "$recipePhotoUrl" },
            description: { $first: "$description" },
            methodOfPreparation: { $first: "$methodOfPreparation" },
            owner_id: { $first: "$owner_id" },
            userName: { $first: "$userName" },
            recipesComments: { $first: "$recipesComments" },
          },
        },
        {
          $project: {
            _id: 1,
            category: 1,
            date: 1,
            title: 1,
            recipeAuthor: 1,
            recipePhotoUrl: 1,
            description: 1,
            methodOfPreparation: 1,
            owner_id: 1,
            userName: 1,
            recipesComments: 1,
          },
        },
      ])
      .exec();
    if (recipeResponse.length > 0) {
      return res.status(200).json({ recipe: recipeResponse[0] });
    } else {
      return res.status(404).json({ response: "Recipe not found" });
    }
  } catch (err) {
    console.log("ERROR: ", err);
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
  GET_RECIPE_BY_ID_WITH_COMMENT,
};
