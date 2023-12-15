import express from "express";
import { ADD_USER, LOGIN } from "../controllers/users.js";

const router = express.Router();

router.post("/users", ADD_USER);
router.post("/users/login", LOGIN);

export default router;
