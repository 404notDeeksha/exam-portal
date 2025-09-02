import express from "express";
const userRouter = express.Router();

import { registerUser, loginUser } from "../controllers/User.controller.js";

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

export default userRouter;
