import express from "express";
const router = express.Router();

import userRouter from "./User.routes.js";
import examRouter from "./Question.routes.js";

import { protect } from "../middleware/authMiddleware.js";

router.use("/auth", userRouter);
router.use("/exam", protect, examRouter);

export default router;
