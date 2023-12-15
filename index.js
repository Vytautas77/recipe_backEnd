import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import recipesRouter from "./src/routes/recipes.js";
import usersRouter from "./src/routes/users.js";

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(recipesRouter);
app.use(usersRouter);

app.use((req, res, next) => {
  let rawData = "";

  req.on("data", (chunk) => {
    rawData += chunk;
  });

  req.on("end", () => {
    console.log("Raw Request Body:", rawData);
    next();
  });
});

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log("err", err));

app.listen(process.env.PORT, () => {
  console.log(`App connected on PORT: ${process.env.PORT}`);
});
