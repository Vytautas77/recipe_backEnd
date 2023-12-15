import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  recipeAuthor: { type: String, required: true },
  recipePhotoUrl: { type: String, required: true },
  description: { type: String, required: true },
  methodOfPreparation: { type: String, required: true },
  owner_id: { type: String, required: true },
});

export default mongoose.model("Recipe", recipeSchema);
