import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
});

export default mongoose.model("Users", usersSchema);
